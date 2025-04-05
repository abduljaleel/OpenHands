import os
import httpx
import requests
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from openhands.server.shared import openhands_config
from openhands.utils.async_utils import call_sync_from_async

app = APIRouter(prefix='/api/bitbucket')


def require_bitbucket_token(request: Request):
    bitbucket_token = request.headers.get('X-Bitbucket-Token')
    if not bitbucket_token:
        raise HTTPException(
            status_code=400,
            detail='Missing X-Bitbucket-Token header',
        )
    return bitbucket_token


class TokenExchangeRequest(BaseModel):
    code: str


@app.post('/token')
async def exchange_code_for_token(request: TokenExchangeRequest):
    """Exchange an authorization code for an access token."""
    client_id = openhands_config.bitbucket_client_id
    client_secret = openhands_config.bitbucket_client_secret
    
    if not client_id or not client_secret:
        raise HTTPException(
            status_code=500,
            detail='Bitbucket client credentials not configured',
        )
    
    app_url = os.environ.get('APP_URL', 'http://localhost:3000')
    redirect_uri = f"{app_url}/oauth/bitbucket/callback"
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.post(
                'https://bitbucket.org/site/oauth2/access_token',
                data={
                    'grant_type': 'authorization_code',
                    'code': request.code,
                    'redirect_uri': redirect_uri,
                },
                auth=(client_id, client_secret),
            )
            response.raise_for_status()
            return JSONResponse(content=response.json())
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f'Error exchanging code for token: {e.response.text}',
        )


@app.get('/repositories')
async def get_bitbucket_repositories(
    page: int = 1,
    per_page: int = 10,
    bitbucket_token: str = Depends(require_bitbucket_token),
):
    """Get repositories for the authenticated user."""
    params: dict[str, str] = {
        'page': str(page),
        'pagelen': str(per_page),
    }
    
    headers = generate_bitbucket_headers(bitbucket_token)
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                'https://api.bitbucket.org/2.0/repositories',
                headers=headers,
                params=params,
            )
            response.raise_for_status()
            json_response = JSONResponse(content=response.json())
            
            if 'Link' in response.headers:
                json_response.headers['Link'] = response.headers['Link']
            
            return json_response
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f'Error fetching repositories: {e.response.text}',
        )


@app.get('/user')
async def get_bitbucket_user(bitbucket_token: str = Depends(require_bitbucket_token)):
    """Get information about the authenticated user."""
    headers = generate_bitbucket_headers(bitbucket_token)
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                'https://api.bitbucket.org/2.0/user',
                headers=headers,
            )
            response.raise_for_status()
            return JSONResponse(content=response.json())
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f'Error fetching user: {e.response.text}',
        )


@app.get('/search/repositories')
async def search_bitbucket_repositories(
    query: str,
    per_page: int = 5,
    bitbucket_token: str = Depends(require_bitbucket_token),
):
    """Search for repositories on Bitbucket."""
    headers = generate_bitbucket_headers(bitbucket_token)
    params = {
        'q': f'name ~ "{query}"',
        'pagelen': str(per_page),
    }
    
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                'https://api.bitbucket.org/2.0/repositories',
                headers=headers,
                params=params,
            )
            response.raise_for_status()
            return JSONResponse(content=response.json())
    except httpx.HTTPStatusError as e:
        raise HTTPException(
            status_code=e.response.status_code,
            detail=f'Error searching repositories: {e.response.text}',
        )


def generate_bitbucket_headers(token: str) -> dict[str, str]:
    """Generate headers for Bitbucket API requests."""
    return {
        'Authorization': f'Bearer {token}',
        'Accept': 'application/json',
    }
