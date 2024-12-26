# Diff Details

Date : 2024-12-21 23:34:42

Directory /Users/mphelps/climb_w_friends_v2/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers

Total : 25 files, 279 codes, 222 comments, 131 blanks, all 632 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files

| filename                                                                                                                                                                                            | language | code | comment | blank | total |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------- | ---: | ------: | ----: | ----: |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/ClimbsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/ClimbsController.cs)                                                 | C#       |  109 |      84 |    55 |   248 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/FeaturesController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/FeaturesController.cs)                                             | C#       |  461 |     105 |   121 |   687 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/MapsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/MapsController.cs)                                                     | C#       |  157 |      69 |    61 |   287 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TagsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TagsController.cs)                                                     | C#       |  135 |       5 |    31 |   171 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/UserController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/UserController.cs)                                                     | C#       |   63 |       6 |    12 |    81 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/AppDbContext.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/AppDbContext.cs)                                                                       | C#       |  -45 |      -5 |   -12 |   -62 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Climb.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Climb.cs)                                                                                     | C#       |  -71 |       0 |    -8 |   -79 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/ClimbToTag.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/ClimbToTag.cs)                                                                           | C#       |  -12 |      -1 |    -4 |   -17 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbConfiguration.cs)                             | C#       |  -52 |      -3 |    -8 |   -63 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbToTagConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/ClimbToTagConfiguration.cs)                   | C#       |  -33 |      -6 |    -7 |   -46 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/FeatureConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/FeatureConfiguration.cs)                         | C#       |  -26 |      -3 |    -9 |   -38 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapConfiguration.cs)                                 | C#       |  -57 |      -1 |    -7 |   -65 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToFeatureToClimbConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToFeatureToClimbConfiguration.cs) | C#       |  -29 |      -2 |    -5 |   -36 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToTagConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToTagConfiguration.cs)                       | C#       |  -33 |      -2 |    -7 |   -42 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToUserConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToUserConfiguration.cs)                     | C#       |  -27 |     -16 |    -9 |   -52 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToUserToClimbConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/MapToUserToClimbConfiguration.cs)       | C#       |  -28 |      -1 |    -7 |   -36 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/TagConfiguration.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Configurations/TagConfiguration.cs)                                 | C#       |  -57 |      -1 |   -11 |   -69 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Feature.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Feature.cs)                                                                                 | C#       |  -72 |      -1 |   -19 |   -92 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Map.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Map.cs)                                                                                         | C#       |  -16 |       0 |    -2 |   -18 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToFeatureToClimb.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToFeatureToClimb.cs)                                                         | C#       |  -12 |      -1 |    -4 |   -17 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToTag.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToTag.cs)                                                                               | C#       |  -12 |      -1 |    -4 |   -17 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToUser.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToUser.cs)                                                                             | C#       |  -11 |      -1 |    -3 |   -15 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToUserToClimb.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/MapToUserToClimb.cs)                                                               | C#       |  -17 |      -1 |    -6 |   -24 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Tag.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/Tag.cs)                                                                                         | C#       |  -18 |      -1 |    -9 |   -28 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/User.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Data/User.cs)                                                                                       | C#       |  -18 |       0 |    -8 |   -26 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details
