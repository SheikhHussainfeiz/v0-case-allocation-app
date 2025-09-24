# Power Apps Formulas Reference

## Key Formulas by Screen

### Dashboard Screen

#### KPI Calculations
\`\`\`
Total Cases: CountRows(Cases)
Open Cases: CountRows(Filter(Cases, Status in ["New", "In Progress", "Pending"]))
Overdue Cases: CountRows(Filter(Cases, DueDate < Today() && Status <> "Closed"))
Avg Resolution: Round(Average(Filter(Cases, Status = "Closed"), DateDiff(CreatedDate, ClosedDate, Days)), 1)
\`\`\`

#### Chart Data
\`\`\`
Cases by Status:
AddColumns(GroupBy(Cases, "Status", "Count"), "Value", CountRows(Count))

Cases by Priority:
AddColumns(GroupBy(Cases, "Priority", "Count"), "Value", CountRows(Count))
\`\`\`

### Daily Load Screen

#### Stats Calculations
\`\`\`
Total Loads: CountRows(DailyLoads)
Processed Loads: CountRows(Filter(DailyLoads, Status = "Processed"))
Pending Loads: CountRows(Filter(DailyLoads, Status = "Pending"))
\`\`\`

#### Process Actions
\`\`\`
Process Single Load:
Patch(DailyLoads, ThisItem, {
    Status: "Processed",
    ProcessedDate: Now(),
    ProcessedBy: User().FullName
})

Process All Loads:
ForAll(
    Filter(DailyLoads, Status = "Pending"),
    Patch(DailyLoads, ThisRecord, {
        Status: "Processed",
        ProcessedDate: Now(),
        ProcessedBy: User().FullName
    })
)
\`\`\`

### Cases Screen

#### Filter Logic
\`\`\`
Gallery Items:
Sort(
    Filter(
        Cases,
        (varSearchText = "" || CustomerName in varSearchText || CaseID in varSearchText) &&
        (varStatusFilter = "All" || Status = varStatusFilter) &&
        (varPriorityFilter = "All" || Priority = varPriorityFilter) &&
        (IsBlank(varAssignedToFilter) || AssignedTo = varAssignedToFilter)
    ),
    CreatedDate,
    Descending
)
\`\`\`

#### Priority Color Logic
\`\`\`
Priority Indicator Color:
Switch(
    ThisItem.Priority,
    "Critical", RGBA(239, 68, 68, 1),
    "High", RGBA(251, 191, 36, 1),
    "Medium", RGBA(59, 130, 246, 1),
    RGBA(34, 197, 94, 1)
)
\`\`\`

#### Status Badge Logic
\`\`\`
Status Badge Color:
Switch(
    ThisItem.Status,
    "New", RGBA(59, 130, 246, 0.2),
    "In Progress", RGBA(251, 191, 36, 0.2),
    "Closed", RGBA(34, 197, 94, 0.2),
    RGBA(156, 163, 175, 0.2)
)

Status Text Color:
Switch(
    ThisItem.Status,
    "New", RGBA(59, 130, 246, 1),
    "In Progress", RGBA(251, 191, 36, 1),
    "Closed", RGBA(34, 197, 94, 1),
    RGBA(156, 163, 175, 1)
)
\`\`\`

### Users Screen

#### Workload Calculations
\`\`\`
Current Load:
CountRows(Filter(Cases, AssignedTo = ThisItem.UserID && Status in ["New", "In Progress"]))

Workload Percentage:
(CountRows(Filter(Cases, AssignedTo = ThisItem.UserID && Status in ["New", "In Progress"])) / ThisItem.MaxDailyLoad) * 100

Progress Bar Width:
Min(200, (CountRows(Filter(Cases, AssignedTo = ThisItem.UserID && Status in ["New", "In Progress"])) / ThisItem.MaxDailyLoad) * 200)
\`\`\`

#### Progress Bar Color
\`\`\`
Progress Bar Color:
If(
    (CountRows(Filter(Cases, AssignedTo = ThisItem.UserID && Status in ["New", "In Progress"])) / ThisItem.MaxDailyLoad) > 0.8,
    RGBA(239, 68, 68, 1),
    If(
        (CountRows(Filter(Cases, AssignedTo = ThisItem.UserID && Status in ["New", "In Progress"])) / ThisItem.MaxDailyLoad) > 0.6,
        RGBA(251, 191, 36, 1),
        RGBA(34, 197, 94, 1)
    )
)
\`\`\`

#### User Initials
\`\`\`
User Initials:
Upper(
    Left(ThisItem.Name, 1) & 
    If(
        Find(" ", ThisItem.Name) > 0,
        Mid(ThisItem.Name, Find(" ", ThisItem.Name) + 1, 1),
        ""
    )
)
\`\`\`

### Config Screen

#### Toggle Updates
\`\`\`
Update Config Value:
Patch(
    SystemConfig,
    LookUp(SystemConfig, ConfigKey = "EnableAutoAssignment"),
    {ConfigValue: Text(Self.Value)}
)

Get Config Value:
Value(LookUp(SystemConfig, ConfigKey = "EnableAutoAssignment", ConfigValue))
\`\`\`

### Reports Screen

#### Performance Metrics
\`\`\`
Cases Resolved This Period:
CountRows(Filter(Cases, 
    Status = "Closed" && 
    ClosedDate >= varStartDate && 
    ClosedDate <= varEndDate
))

Average Resolution Time:
Round(
    Average(
        Filter(Cases, 
            Status = "Closed" && 
            ClosedDate >= varStartDate && 
            ClosedDate <= varEndDate
        ), 
        DateDiff(CreatedDate, ClosedDate, Days)
    ), 
    1
)

SLA Compliance Rate:
Round(
    (CountRows(Filter(Cases, 
        SLAMet = true && 
        ClosedDate >= varStartDate && 
        ClosedDate <= varEndDate
    )) / 
    CountRows(Filter(Cases, 
        ClosedDate >= varStartDate && 
        ClosedDate <= varEndDate
    ))) * 100, 
    1
)
\`\`\`

#### Chart Data
\`\`\`
Resolution Trend:
AddColumns(
    AddColumns(
        GroupBy(
            Filter(Cases, 
                Status = "Closed" && 
                ClosedDate >= varStartDate && 
                ClosedDate <= varEndDate
            ),
            "Month",
            "Cases"
        ),
        "Count", CountRows(Cases)
    ),
    "MonthName", Text(DateValue("1/" & Month & "/2024"), "mmm")
)

User Performance:
AddColumns(
    AddColumns(
        GroupBy(
            Filter(Cases, 
                Status = "Closed" && 
                ClosedDate >= varStartDate && 
                ClosedDate <= varEndDate
            ),
            "AssignedTo",
            "UserCases"
        ),
        "ResolvedCount", CountRows(UserCases)
    ),
    "UserName", LookUp(Users, UserID = AssignedTo, Name)
)
\`\`\`

## Common Utility Formulas

### Date Formatting
\`\`\`
Short Date: Text(ThisItem.CreatedDate, "mm/dd/yyyy")
Date with Time: Text(ThisItem.CreatedDate, "mm/dd/yyyy hh:mm")
Relative Date: DateDiff(ThisItem.CreatedDate, Today(), Days) & " days ago"
\`\`\`

### Conditional Visibility
\`\`\`
Show if not empty: !IsBlank(ThisItem.Field)
Show if status matches: ThisItem.Status = "Pending"
Show if user has permission: ThisItem.AssignedTo = User().Email
\`\`\`

### Data Validation
\`\`\`
Required Field: !IsBlank(TextInput.Text)
Email Format: IsMatch(TextInput.Text, Email)
Number Range: Value(TextInput.Text) >= 1 && Value(TextInput.Text) <= 100
