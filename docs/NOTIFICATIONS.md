# Setting Up Notifications for GitHub Actions Workflow

This document provides guidance on setting up automatic notifications for GitHub Actions workflow runs, particularly for scheduled runs.

## Available Notification Methods

Our workflow has been configured with notification steps, but they are commented out. You can activate:

1. **Email notifications**
2. **Slack notifications**
3. **Console notifications** (enabled by default)

## Setting Up Email Notifications

To enable email notifications after each workflow run:

1. **Set up secrets in your GitHub Repository:**
   - Go to your GitHub repository
   - Navigate to "Settings" > "Secrets and variables" > "Actions"
   - Add the following secrets:
     - `MAIL_SERVER`: SMTP server address (e.g., smtp.gmail.com)
     - `MAIL_USERNAME`: Your username/email
     - `MAIL_PASSWORD`: Your password or app password (for Gmail)
     - `NOTIFICATION_EMAIL`: Email address to receive notifications

2. **Uncomment the email notification lines in the workflow:**
   - Open the `.github/workflows/cypress.yml` file
   - Find the `# Send notification via email` section
   - Remove the `#` symbol at the beginning of the relevant lines

## Setting Up Slack Notifications

To enable Slack notifications after each workflow run:

1. **Create a Webhook URL in Slack:**
   - Go to [Slack Apps](https://api.slack.com/apps)
   - Create a new app or use an existing one
   - Enable "Incoming Webhooks"
   - Create a new webhook and select a channel to post notifications
   - Copy the webhook URL

2. **Set up secrets in your GitHub Repository:**
   - Go to your GitHub repository
   - Navigate to "Settings" > "Secrets and variables" > "Actions"
   - Add the following secrets:
     - `SLACK_WEBHOOK`: The webhook URL you copied
     - `SLACK_CHANNEL` (optional): Channel name (e.g., #test-notifications)

3. **Uncomment the Slack notification lines in the workflow:**
   - Open the `.github/workflows/cypress.yml` file
   - Find the `# Send notification via Slack` section
   - Remove the `#` symbol at the beginning of the relevant lines

## Customizing Notifications

### Email

You can customize the subject, body, and attachments in the `Send Email Notification` section of the workflow:

```yaml
subject: "[${{ job.status }}] Cypress API Tests - Daily Scheduled Run"
body: |
  Cypress API Tests Daily Scheduled Run completed with status: ${{ job.status }}
  
  Environment: ${{ github.event.inputs.environment || env.DEFAULT_ENVIRONMENT }}
  Date: $(date)
  Workflow: ${{ github.workflow }}
  Run Link: https://github.com/${{ github.repository }}/actions/runs/${{ github.run_id }}
  
  See attachment for detailed test results
```

### Slack

You can customize the channel, color, title, and content in the `Send Slack Notification` section of the workflow:

```yaml
SLACK_CHANNEL: ${{ secrets.SLACK_CHANNEL || 'test-notifications' }}
SLACK_COLOR: ${{ job.status == 'success' && 'good' || job.status == 'cancelled' && 'warning' || 'danger' }}
SLACK_TITLE: "Cypress API Tests - Daily Scheduled Run"
SLACK_MESSAGE: "Status: ${{ job.status }}\nEnvironment: ${{ github.event.inputs.environment || env.DEFAULT_ENVIRONMENT }}"
```

## Notes

- For Gmail, you need to use an [App Password](https://support.google.com/accounts/answer/185833) instead of your regular password
- Enabling both email and Slack will send notifications through both channels
- If you don't want to receive notifications for successful runs, you can change the condition from `if: always()` to `if: failure()`
