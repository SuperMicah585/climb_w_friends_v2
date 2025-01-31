# Diff Details

Date : 2025-01-06 17:18:12

Directory /Users/mphelps/climb_w_friends_v2/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers

Total : 41 files, 835 codes, 335 comments, 267 blanks, all 1437 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files

| filename                                                                                                                                                                                            | language | code | comment | blank | total |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | ---: | ------: | ----: | ----: |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/AttemptsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/AttemptsController.cs)                                             | C#       |  132 |      10 |    41 |   183 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/ClimbChatController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/ClimbChatController.cs)                                           | C#       |   88 |      40 |    22 |   150 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/ClimbsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/ClimbsController.cs)                                                 | C#       |  142 |      88 |    66 |   296 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/FeaturesController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/FeaturesController.cs)                                             | C#       |  718 |     129 |   175 | 1,022 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/FilterController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/FilterController.cs)                                                 | C#       |  184 |      33 |    58 |   275 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/MapsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/MapsController.cs)                                                     | C#       |  183 |      64 |    62 |   309 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TagsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TagsController.cs)                                                     | C#       |  135 |       5 |    31 |   171 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TicksController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TicksController.cs)                                                   | C#       |  114 |       8 |    22 |   144 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/UserController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/UserController.cs)                                                     | C#       |  107 |       9 |    21 |   137 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/AppDbContext.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/AppDbContext.cs)                                                                       | C#       |  -51 |      -5 |   -12 |   -68 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Attempt.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Attempt.cs)                                                                                 | C#       |  -22 |       0 |    -3 |   -25 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Climb.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Climb.cs)                                                                                     | C#       |  -72 |       0 |    -6 |   -78 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/ClimbChat.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/ClimbChat.cs)                                                                             | C#       |  -28 |       0 |    -5 |   -33 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/ClimbToTag.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/ClimbToTag.cs)                                                                           | C#       |  -12 |      -1 |    -4 |   -17 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/AttemptConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/AttemptConfiguration.cs)                         | C#       |  -35 |      -1 |    -7 |   -43 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbChatConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbChatConfiguration.cs)                     | C#       |  -34 |      -1 |    -9 |   -44 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbConfiguration.cs)                             | C#       |  -61 |      -4 |    -9 |   -74 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbToTagConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbToTagConfiguration.cs)                   | C#       |  -33 |      -6 |    -7 |   -46 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/FeatureConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/FeatureConfiguration.cs)                         | C#       |  -26 |      -3 |    -9 |   -38 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/GradeRangeFilterConfigurations.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/GradeRangeFilterConfigurations.cs)     | C#       |  -24 |       0 |   -12 |   -36 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapConfiguration.cs)                                 | C#       |  -57 |      -1 |    -7 |   -65 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToFeatureToClimbConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToFeatureToClimbConfiguration.cs) | C#       |  -29 |      -2 |    -5 |   -36 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToTagConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToTagConfiguration.cs)                       | C#       |  -33 |      -2 |    -7 |   -42 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToUserConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToUserConfiguration.cs)                     | C#       |  -27 |     -16 |    -9 |   -52 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToUserToClimbConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToUserToClimbConfiguration.cs)       | C#       |  -28 |      -1 |    -7 |   -36 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/TagConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/TagConfiguration.cs)                                 | C#       |  -57 |      -1 |   -11 |   -69 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/TagFilterConfigurations.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/TagFilterConfigurations.cs)                   | C#       |  -23 |       0 |   -10 |   -33 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/TickConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/TickConfiguration.cs)                               | C#       |  -34 |      -1 |    -9 |   -44 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/UserFilterConfigurations.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/UserFilterConfigurations.cs)                 | C#       |  -27 |       0 |   -10 |   -37 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Feature.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Feature.cs)                                                                                 | C#       |  -75 |      -1 |   -19 |   -95 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/GradeRangeFilter.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/GradeRangeFilter.cs)                                                               | C#       |  -16 |       0 |    -4 |   -20 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Map.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Map.cs)                                                                                         | C#       |  -16 |       0 |    -2 |   -18 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToFeatureToClimb.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToFeatureToClimb.cs)                                                         | C#       |  -12 |      -1 |    -4 |   -17 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToTag.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToTag.cs)                                                                               | C#       |  -12 |      -1 |    -4 |   -17 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToUser.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToUser.cs)                                                                             | C#       |  -11 |      -1 |    -3 |   -15 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToUserToClimb.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToUserToClimb.cs)                                                               | C#       |  -17 |      -1 |    -6 |   -24 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Tag.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Tag.cs)                                                                                         | C#       |  -18 |      -1 |    -9 |   -28 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/TagFilter.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/TagFilter.cs)                                                                             | C#       |  -15 |       0 |    -4 |   -19 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Ticks.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Ticks.cs)                                                                                     | C#       |  -22 |       0 |    -4 |   -26 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/User.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/User.cs)                                                                                       | C#       |  -24 |       0 |   -10 |   -34 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/UserFilter.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/UserFilter.cs)                                                                           | C#       |  -17 |       0 |    -4 |   -21 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details
