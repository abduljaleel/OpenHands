# Bitbucket Knowledge

## Overview
Bitbucket is a Git-based source code repository hosting service owned by Atlassian. It offers both cloud-hosted and self-hosted options. This knowledge base focuses on Bitbucket Cloud.

## Authentication
Bitbucket Cloud uses OAuth 2.0 for authentication. The authentication flow involves:
1. Redirecting users to Bitbucket's authorization page
2. Users grant permission to the application
3. Bitbucket redirects back with an authorization code
4. The application exchanges this code for an access token
5. The access token is used for API requests

## API Endpoints
Bitbucket Cloud API v2.0 is RESTful and uses JSON for data exchange.

### Common Endpoints
- `GET /2.0/user` - Get the authenticated user's information
- `GET /2.0/repositories` - List repositories accessible to the authenticated user
- `GET /2.0/repositories/{workspace}/{repo_slug}` - Get repository information
- `GET /2.0/repositories/{workspace}/{repo_slug}/refs/branches` - List branches
- `POST /2.0/repositories/{workspace}/{repo_slug}/pullrequests` - Create a pull request
- `GET /2.0/repositories/{workspace}/{repo_slug}/pullrequests/{pull_request_id}` - Get pull request details
- `GET /2.0/repositories/{workspace}/{repo_slug}/issues` - List issues
- `GET /2.0/repositories/{workspace}/{repo_slug}/issues/{issue_id}` - Get issue details

### Authentication Headers
```
Authorization: Bearer {access_token}
```

## Repository Structure
Bitbucket repositories are identified by:
- Workspace (team or user account)
- Repository slug (URL-friendly name)

Example: `https://bitbucket.org/{workspace}/{repo_slug}`

## Pull Requests
Pull requests in Bitbucket allow developers to propose changes to a repository.

### Creating a Pull Request
To create a pull request via the API:
```json
{
  "title": "PR title",
  "description": "PR description",
  "source": {
    "branch": {
      "name": "source-branch"
    }
  },
  "destination": {
    "branch": {
      "name": "destination-branch"
    }
  },
  "close_source_branch": true
}
```

### Pull Request States
- `OPEN`: The pull request is open and ready for review
- `MERGED`: The pull request has been merged
- `DECLINED`: The pull request has been declined/rejected
- `SUPERSEDED`: The pull request has been superseded by another pull request

## Issues
Bitbucket issues track bugs, features, and tasks.

### Issue Fields
- `id`: Unique identifier
- `title`: Issue title
- `content`: Issue description
- `state`: Issue state (new, open, resolved, etc.)
- `priority`: Issue priority
- `assignee`: User assigned to the issue

## Workspaces
Workspaces are the top-level organizational unit in Bitbucket Cloud.
- Personal workspaces are tied to individual user accounts
- Team workspaces allow multiple users to collaborate

## Permissions
Bitbucket uses a role-based permission system:
- Admin: Full control over the repository
- Write: Can push changes but cannot delete the repository
- Read: Can clone and pull but cannot push changes

## Best Practices
1. Use descriptive branch names
2. Write clear commit messages
3. Keep pull requests focused on a single task
4. Use issues to track bugs and features
5. Leverage Bitbucket Pipelines for CI/CD
