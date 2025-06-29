# Automated Test Scheduling

This project has been configured to run automated tests on a schedule using GitHub Actions.

## Current Configuration

- **Frequency**: Every weekday (Monday to Friday)
- **Time**: 9:00 AM Vietnam time (UTC+7) / 2:00 AM UTC
- **Tests Executed**: Only simple API tests (API_Smoke_Test, Simple_API_Test)
- **Workflow Name**: "Cypress Simple API Tests"

## How It Works

GitHub Actions uses cron syntax for scheduling. The current configuration `0 2 * * 1-5` means:
- `0`: Minute 0
- `2`: Hour 2 UTC (equivalent to 9:00 AM Vietnam time)
- `*`: Every day of the month
- `*`: Every month
- `1-5`: Only run on Monday (1) through Friday (5)

## Monitoring and Notifications for Scheduled Runs

### Viewing Runs

1. Access your GitHub project repository
2. Select the "Actions" tab in the top menu bar
3. You will see a list of workflow runs, including scheduled automatic runs
4. Scheduled runs will have a "schedule" label next to them and be named "Cypress Simple API Tests"

### Default Workflow Notifications

GitHub does not send email notifications by default when workflows run successfully, but it will notify you when:

1. **Workflow fails**: GitHub will send an email notification to the repository owner
2. **Workflow requires approval**: If there are steps requiring manual approval

#### Enabling More Detailed Notifications:

1. Go to your GitHub page
2. Click the bell icon in the top right corner
3. Select "Notification settings"
4. In the "GitHub Actions" section, you can configure:
   - "Notify me about all workflow runs": Receive notifications for all runs
   - "Notify me if a workflow needs my review": Only when approval is needed
   - "Notify me if a workflow fails": Only when failures occur

### Notifications Through Other Channels

To receive notifications through other channels (Slack, Teams, email, etc.), you can add steps like this to the end of your workflow:

```yaml
- name: Send notification
  if: always()  # Run this step regardless of whether the workflow succeeds or fails
  uses: rtCamp/action-slack-notify@v2  # This is just an example with Slack
  env:
    SLACK_WEBHOOK: ${{ secrets.SLACK_WEBHOOK }}
    SLACK_TITLE: 'Cypress Tests Result'
    SLACK_MESSAGE: 'Automated tests completed with status: ${{ job.status }}'
```

## Adjusting the Schedule

If you want to change the schedule, you need to edit the `.github/workflows/cypress.yml` file and update the `schedule` section with a different cron syntax.

### Common Cron Examples:

- `0 2 * * *` - Run daily at 2:00 AM UTC (9:00 AM Vietnam time)
- `0 2 * * 1-5` - Run on weekdays (Monday to Friday) at 2:00 AM UTC
- `0 2 * * 0,6` - Run on weekends (Sunday and Saturday) at 2:00 AM UTC
- `0 2 1 * *` - Run on the 1st day of every month at 2:00 AM UTC
- `0 2,14 * * *` - Run twice daily at 2:00 AM and 2:00 PM UTC

## Time Zone Notes

GitHub Actions runs on UTC time. To calculate run times for Vietnam time (UTC+7), subtract 7 hours from Vietnam time to get the corresponding UTC time.

Examples:
- 9:00 AM Vietnam time = 2:00 AM UTC (9 - 7 = 2)
- 3:00 PM Vietnam time = 8:00 AM UTC (15 - 7 = 8)
- 10:00 PM Vietnam time = 3:00 PM UTC (22 - 7 = 15)

## Viewing Run History

You can view the history of automated runs in the "Actions" tab of your GitHub repository.
