# Power Apps Case Allocation Management - Setup Instructions

## Prerequisites
- Power Apps Premium license
- Dataverse environment
- Power Automate (for advanced workflows)

## Step 1: Import Data Sources
1. Open Power Apps Studio
2. Create new Canvas App (Tablet layout)
3. Add data sources:
   - Cases (Dataverse table)
   - Users (Dataverse table)
   - DailyLoads (Dataverse table)
   - CaseNotes (Dataverse table)
   - SystemConfig (Dataverse table)

## Step 2: Set App Variables (OnStart)
Add this formula to App OnStart:
\`\`\`
Set(varSearchText, "");
Set(varStatusFilter, "All");
Set(varPriorityFilter, "All");
Set(varAssignedToFilter, "");
Set(varShowCaseDetails, false);
Set(varSelectedCase, Blank());
Set(varStartDate, DateAdd(Today(), -30, Days));
Set(varEndDate, Today());
Set(varReportUser, "");

// Color theme variables
Set(varPrimaryColor, RGBA(59, 130, 246, 1));
Set(varSecondaryColor, RGBA(147, 51, 234, 1));
Set(varDarkBg, RGBA(10, 10, 10, 1));
Set(varCardBg, RGBA(26, 26, 26, 1));
Set(varTextPrimary, RGBA(255, 255, 255, 1));
Set(varTextSecondary, RGBA(156, 163, 175, 1));
Set(varSuccessColor, RGBA(34, 197, 94, 1));
Set(varWarningColor, RGBA(251, 191, 36, 1));
Set(varErrorColor, RGBA(239, 68, 68, 1));

// Load initial data
ClearCollect(colCases, Cases);
ClearCollect(colUsers, Users);
\`\`\`

## Step 3: Create Screens
Create 6 screens with these exact names:
1. DashboardScreen
2. DailyLoadScreen
3. CasesScreen
4. UsersScreen
5. ConfigScreen
6. ReportsScreen

## Step 4: Build Each Screen
Follow the JSON configurations in the screens/ folder to build each screen component by component.

### Screen Building Order:
1. **DashboardScreen** - Start here (simplest layout)
2. **UsersScreen** - Build user management
3. **DailyLoadScreen** - Add load processing
4. **CasesScreen** - Most complex, build last
5. **ConfigScreen** - System settings
6. **ReportsScreen** - Analytics and charts

## Step 5: Navigation Setup
Add navigation buttons to each screen or create a navigation menu:

\`\`\`
Navigate(DashboardScreen, ScreenTransition.Fade)
Navigate(CasesScreen, ScreenTransition.Fade)
Navigate(UsersScreen, ScreenTransition.Fade)
Navigate(DailyLoadScreen, ScreenTransition.Fade)
Navigate(ConfigScreen, ScreenTransition.Fade)
Navigate(ReportsScreen, ScreenTransition.Fade)
\`\`\`

## Step 6: Power Automate Flows (Optional)
Create these flows for advanced functionality:
1. **Case Auto-Assignment Flow**
2. **SLA Breach Notification Flow**
3. **Daily Load Processing Flow**
4. **Report Generation Flow**

## Component Implementation Tips

### Galleries
- Use the template configurations from JSON files
- Set Items property with the provided formulas
- Configure template size and layout

### Forms
- Use Edit forms for case details
- Set DataSource, Item, and DefaultMode properties
- Configure individual form fields

### Charts
- Use the Items formulas provided
- Set axis names correctly
- Configure colors to match theme

### Buttons
- Use OnSelect formulas from JSON
- Apply consistent styling
- Add loading states where needed

## Testing Checklist
- [ ] All screens load without errors
- [ ] Navigation works between screens
- [ ] Data displays correctly in galleries
- [ ] Filters work on Cases screen
- [ ] Forms save data properly
- [ ] Charts display data
- [ ] Toggles update database
- [ ] Search functionality works
- [ ] Mobile responsiveness

## Deployment
1. Save and publish the app
2. Share with users
3. Set up security roles in Dataverse
4. Configure Power Automate flows
5. Test with real data

## Troubleshooting
- Check delegation warnings in formulas
- Verify data source connections
- Test with small datasets first
- Use Monitor tool for debugging
- Check Power Apps community for common issues
