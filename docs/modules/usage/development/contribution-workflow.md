# Contribution Workflow

This guide outlines the process for contributing to OpenHands.

## Contribution Process

1. **Find or Create an Issue**
   - Check existing issues or create a new one
   - Discuss the proposed changes with maintainers
   - Get feedback on your approach before starting work
   - Link related issues to provide context

2. **Fork and Clone the Repository**
   - Fork the repository on GitHub
   - Clone your fork locally
   ```bash
   git clone https://github.com/your-username/OpenHands.git
   cd OpenHands
   ```
   - Add the upstream repository as a remote
   ```bash
   git remote add upstream https://github.com/All-Hands-AI/OpenHands.git
   ```

3. **Create a Branch**
   - Create a branch for your changes
   - Use a descriptive name for your branch
   ```bash
   git checkout -b feature/your-feature-name
   ```
   - Keep your branch focused on a single issue or feature

4. **Make Changes**
   - Follow the [Code Style Guidelines](/modules/usage/development/code-style)
   - Ensure all tests pass
   - Write new tests for your changes
   - Update documentation as needed
   - Keep commits small and focused
   - Write clear commit messages

5. **Test Your Changes**
   - Run the linting tools
   ```bash
   # Backend linting
   make lint-backend
   
   # Frontend linting
   make lint-frontend
   ```
   - Run the tests
   ```bash
   # Unit tests
   poetry run pytest ./tests/unit/test_*.py
   
   # Integration tests
   poetry run pytest ./tests/integration/test_*.py
   ```
   - Manually test your changes

6. **Submit a Pull Request**
   - Push your changes to your fork
   ```bash
   git push origin feature/your-feature-name
   ```
   - Create a pull request to the main repository
   - Provide a clear description of your changes
   - Reference any related issues
   - Wait for review and address feedback

7. **Address Feedback**
   - Make requested changes
   - Push additional commits to your branch
   - Respond to reviewer comments
   - Update the pull request as needed

8. **Merge and Cleanup**
   - Once approved, your pull request will be merged
   - Delete your branch after it's merged
   - Keep your fork in sync with the upstream repository
   ```bash
   git checkout main
   git pull upstream main
   git push origin main
   ```

## Pull Request Guidelines

### PR Title and Description

- Use a clear, descriptive title
- Provide a detailed description of your changes
- Reference related issues using the GitHub issue reference syntax (e.g., "Fixes #123")
- Include any necessary context or background information
- List any breaking changes or deprecations

### PR Checklist

Before submitting a pull request, ensure:

- [ ] Code follows the project's style guidelines
- [ ] Tests have been added or updated
- [ ] Documentation has been updated
- [ ] All tests pass
- [ ] The code builds without errors
- [ ] No unnecessary dependencies have been added
- [ ] No sensitive information is included

## Code Review Process

### Reviewer Responsibilities

- Review code for correctness, style, and performance
- Provide constructive feedback
- Suggest improvements
- Approve or request changes

### Author Responsibilities

- Respond to feedback in a timely manner
- Address all requested changes
- Explain design decisions when necessary
- Be open to suggestions and improvements

## Commit Guidelines

### Commit Messages

- Use the imperative mood (e.g., "Add feature" not "Added feature")
- Keep the first line under 50 characters
- Provide a detailed description in the body if necessary
- Reference related issues in the body

Example:
```
Add user authentication feature

- Implement JWT-based authentication
- Add login and registration endpoints
- Update user model to include password hashing
- Add tests for authentication endpoints

Fixes #123
```

### Commit Organization

- Keep commits small and focused
- Group related changes in a single commit
- Separate unrelated changes into different commits
- Rebase and squash commits before submitting a pull request

## Branch Management

### Branch Naming

- Use descriptive names for branches
- Follow the pattern: `type/description`
- Types include: `feature`, `bugfix`, `docs`, `test`, `refactor`

Examples:
- `feature/user-authentication`
- `bugfix/fix-memory-leak`
- `docs/update-readme`
- `test/add-integration-tests`
- `refactor/improve-performance`

### Branch Lifecycle

- Create a branch for each feature or bugfix
- Keep branches up to date with the main branch
- Delete branches after they are merged

## Continuous Integration

OpenHands uses GitHub Actions for continuous integration:

- All pull requests are automatically tested
- Tests must pass before a pull request can be merged
- Code coverage is tracked and should not decrease
- Linting is enforced to maintain code quality

## Release Process

OpenHands follows a semantic versioning approach:

- **Major version**: Incompatible API changes
- **Minor version**: Backward-compatible functionality
- **Patch version**: Backward-compatible bug fixes

The release process involves:

1. Creating a release branch
2. Updating version numbers
3. Generating release notes
4. Creating a GitHub release
5. Publishing Docker images

## Getting Help

If you need help with the contribution process:

- Check the [Documentation](https://docs.all-hands.dev/)
- Ask questions in the [GitHub Discussions](https://github.com/All-Hands-AI/OpenHands/discussions)
- Join the community chat channels

## Code of Conduct

All contributors are expected to adhere to the project's Code of Conduct. Please read it before contributing.
