from pydantic import BaseModel


class BitbucketReviewThread(BaseModel):
    comment: str
    files: list[str]


class BitbucketIssue(BaseModel):
    workspace: str
    repo_slug: str
    number: int
    title: str
    body: str
    thread_comments: list[str] | None = None
    closing_issues: list[str] | None = None
    review_comments: list[str] | None = None
    review_threads: list[BitbucketReviewThread] | None = None
    thread_ids: list[str] | None = None
    head_branch: str | None = None
    base_branch: str | None = None
