# Diff Details

Date : 2024-12-26 12:26:12

Directory /Users/mphelps/climb_w_friends_v2/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers

Total : 58 files, -5483 codes, 86 comments, -287 blanks, all -5684 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files

| filename                                                                                                                                                                      | language       | code | comment | blank | total |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------- | ---: | ------: | ----: | ----: |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/AttemptsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/AttemptsController.cs)                       | C#             |  132 |      10 |    41 |   183 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/ClimbsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/ClimbsController.cs)                           | C#             |  129 |      88 |    62 |   279 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/FeaturesController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/FeaturesController.cs)                       | C#             |  503 |     106 |   126 |   735 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/MapsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/MapsController.cs)                               | C#             |  157 |      69 |    61 |   287 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TagsController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TagsController.cs)                               | C#             |  135 |       5 |    31 |   171 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TicksController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/TicksController.cs)                             | C#             |  114 |       8 |    22 |   144 |
| [ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/UserController.cs](/ClimbWithFriendsAPI/ClimbWithFriendsAPI/Controllers/UserController.cs)                               | C#             |   63 |       6 |    12 |    81 |
| [src/App.tsx](/src/App.tsx)                                                                                                                                                   | TypeScript JSX |  -11 |       0 |    -2 |   -13 |
| [src/assets/react.svg](/src/assets/react.svg)                                                                                                                                 | XML            |   -1 |       0 |     0 |    -1 |
| [src/index.css](/src/index.css)                                                                                                                                               | CSS            |  -34 |      -4 |    -5 |   -43 |
| [src/main.tsx](/src/main.tsx)                                                                                                                                                 | TypeScript JSX |  -29 |      -2 |    -3 |   -34 |
| [src/pages/dashboard.tsx](/src/pages/dashboard.tsx)                                                                                                                           | TypeScript JSX |  -26 |       0 |    -4 |   -30 |
| [src/pages/dashboardComponents/dashboardObjects.tsx](/src/pages/dashboardComponents/dashboardObjects.tsx)                                                                     | TypeScript JSX | -377 |       0 |    -2 |  -379 |
| [src/pages/dashboardComponents/maps.tsx](/src/pages/dashboardComponents/maps.tsx)                                                                                             | TypeScript JSX | -231 |      -9 |   -25 |  -265 |
| [src/pages/dashboardComponents/mapsComponents/addMapModal.tsx](/src/pages/dashboardComponents/mapsComponents/addMapModal.tsx)                                                 | TypeScript JSX | -113 |      -1 |   -10 |  -124 |
| [src/pages/dashboardComponents/mapsComponents/editModal.tsx](/src/pages/dashboardComponents/mapsComponents/editModal.tsx)                                                     | TypeScript JSX | -286 |       0 |   -20 |  -306 |
| [src/pages/dashboardComponents/navBar.tsx](/src/pages/dashboardComponents/navBar.tsx)                                                                                         | TypeScript JSX |  -57 |       0 |    -6 |   -63 |
| [src/pages/dashboardComponents/utilityFunctions.tsx](/src/pages/dashboardComponents/utilityFunctions.tsx)                                                                     | TypeScript JSX | -188 |     -15 |   -25 |  -228 |
| [src/pages/filterProvider.tsx](/src/pages/filterProvider.tsx)                                                                                                                 | TypeScript JSX |  -28 |       0 |    -7 |   -35 |
| [src/pages/homeComponents/homeNavBar.tsx](/src/pages/homeComponents/homeNavBar.tsx)                                                                                           | TypeScript JSX |  -40 |       0 |    -4 |   -44 |
| [src/pages/login.tsx](/src/pages/login.tsx)                                                                                                                                   | TypeScript JSX |  -97 |     -22 |    -9 |  -128 |
| [src/pages/map.tsx](/src/pages/map.tsx)                                                                                                                                       | TypeScript JSX | -307 |     -12 |   -55 |  -374 |
| [src/pages/mapComponents/activityFeed.tsx](/src/pages/mapComponents/activityFeed.tsx)                                                                                         | TypeScript JSX |  -62 |      -1 |    -9 |   -72 |
| [src/pages/mapComponents/attemptOverlay.tsx](/src/pages/mapComponents/attemptOverlay.tsx)                                                                                     | TypeScript JSX | -187 |      -3 |   -15 |  -205 |
| [src/pages/mapComponents/chatOverlay.tsx](/src/pages/mapComponents/chatOverlay.tsx)                                                                                           | TypeScript JSX |  -89 |      -1 |    -9 |   -99 |
| [src/pages/mapComponents/mapApiRequests.tsx](/src/pages/mapComponents/mapApiRequests.tsx)                                                                                     | TypeScript JSX | -423 |     -14 |   -45 |  -482 |
| [src/pages/mapComponents/mapLayers.tsx](/src/pages/mapComponents/mapLayers.tsx)                                                                                               | TypeScript JSX | -358 |     -62 |   -42 |  -462 |
| [src/pages/mapComponents/mapNavBar.tsx](/src/pages/mapComponents/mapNavBar.tsx)                                                                                               | TypeScript JSX |  -95 |       0 |    -3 |   -98 |
| [src/pages/mapComponents/mapObjects.tsx](/src/pages/mapComponents/mapObjects.tsx)                                                                                             | TypeScript JSX | -248 |       0 |    -9 |  -257 |
| [src/pages/mapComponents/modalComponents/addClimbModal.tsx](/src/pages/mapComponents/modalComponents/addClimbModal.tsx)                                                       | TypeScript JSX | -439 |     -14 |   -49 |  -502 |
| [src/pages/mapComponents/modalComponents/allClimbsModal.tsx](/src/pages/mapComponents/modalComponents/allClimbsModal.tsx)                                                     | TypeScript JSX |  -32 |       0 |    -3 |   -35 |
| [src/pages/mapComponents/modalComponents/climbModal.tsx](/src/pages/mapComponents/modalComponents/climbModal.tsx)                                                             | TypeScript JSX | -321 |      -9 |   -35 |  -365 |
| [src/pages/mapComponents/modalComponents/filterModal.tsx](/src/pages/mapComponents/modalComponents/filterModal.tsx)                                                           | TypeScript JSX | -283 |      -4 |   -25 |  -312 |
| [src/pages/mapComponents/modalComponents/filterModalComponents.tsx/GradeDropDowns.tsx](/src/pages/mapComponents/modalComponents/filterModalComponents.tsx/GradeDropDowns.tsx) | TypeScript JSX |  -70 |       0 |    -6 |   -76 |
| [src/pages/mapComponents/modalComponents/modalSearch.tsx](/src/pages/mapComponents/modalComponents/modalSearch.tsx)                                                           | TypeScript JSX |  -83 |      -1 |   -12 |   -96 |
| [src/pages/mapComponents/modalComponents/modalTag.tsx](/src/pages/mapComponents/modalComponents/modalTag.tsx)                                                                 | TypeScript JSX | -152 |      -4 |   -15 |  -171 |
| [src/pages/mapComponents/modalComponents/tagOverlay.tsx](/src/pages/mapComponents/modalComponents/tagOverlay.tsx)                                                             | TypeScript JSX |  -16 |       0 |    -2 |   -18 |
| [src/pages/mapComponents/popup.css](/src/pages/mapComponents/popup.css)                                                                                                       | CSS            |  -28 |      -3 |    -3 |   -34 |
| [src/pages/mapComponents/search.tsx](/src/pages/mapComponents/search.tsx)                                                                                                     | TypeScript JSX | -167 |      -5 |   -12 |  -184 |
| [src/pages/mapComponents/tickAndAttempt.tsx](/src/pages/mapComponents/tickAndAttempt.tsx)                                                                                     | TypeScript JSX | -157 |      -4 |    -9 |  -170 |
| [src/pages/mapComponents/tickOverlay.tsx](/src/pages/mapComponents/tickOverlay.tsx)                                                                                           | TypeScript JSX | -186 |      -2 |   -17 |  -205 |
| [src/reusableComponents/chatInput.tsx](/src/reusableComponents/chatInput.tsx)                                                                                                 | TypeScript JSX |  -34 |       0 |    -4 |   -38 |
| [src/reusableComponents/climbModalBar.tsx](/src/reusableComponents/climbModalBar.tsx)                                                                                         | TypeScript JSX | -327 |      -6 |   -22 |  -355 |
| [src/reusableComponents/downDrop.tsx](/src/reusableComponents/downDrop.tsx)                                                                                                   | TypeScript JSX |  -53 |       0 |    -2 |   -55 |
| [src/reusableComponents/dropDown.tsx](/src/reusableComponents/dropDown.tsx)                                                                                                   | TypeScript JSX |  -93 |       0 |    -9 |  -102 |
| [src/reusableComponents/genericButton.tsx](/src/reusableComponents/genericButton.tsx)                                                                                         | TypeScript JSX |  -30 |       0 |    -1 |   -31 |
| [src/reusableComponents/genericModal.tsx](/src/reusableComponents/genericModal.tsx)                                                                                           | TypeScript JSX |  -48 |      -2 |    -5 |   -55 |
| [src/reusableComponents/input.tsx](/src/reusableComponents/input.tsx)                                                                                                         | TypeScript JSX |  -47 |       0 |    -8 |   -55 |
| [src/reusableComponents/loginButton.tsx](/src/reusableComponents/loginButton.tsx)                                                                                             | TypeScript JSX |  -18 |       0 |    -4 |   -22 |
| [src/reusableComponents/logoutButton.tsx](/src/reusableComponents/logoutButton.tsx)                                                                                           | TypeScript JSX |  -22 |       0 |    -4 |   -26 |
| [src/reusableComponents/searchDropDown.tsx](/src/reusableComponents/searchDropDown.tsx)                                                                                       | TypeScript JSX |  -50 |       0 |    -6 |   -56 |
| [src/reusableComponents/styles.tsx](/src/reusableComponents/styles.tsx)                                                                                                       | TypeScript JSX | -386 |       0 |   -25 |  -411 |
| [src/reusableComponents/toastContainer.tsx](/src/reusableComponents/toastContainer.tsx)                                                                                       | TypeScript JSX |  -53 |       0 |    -8 |   -61 |
| [src/reusableComponents/toastNotification.tsx](/src/reusableComponents/toastNotification.tsx)                                                                                 | TypeScript JSX |  -98 |      -3 |    -9 |  -110 |
| [src/reusableComponents/toolTip.tsx](/src/reusableComponents/toolTip.tsx)                                                                                                     | TypeScript JSX |  -65 |      -2 |    -6 |   -73 |
| [src/supaBaseClient.tsx](/src/supaBaseClient.tsx)                                                                                                                             | TypeScript JSX |  -45 |      -1 |   -12 |   -58 |
| [src/types/Posts.ts](/src/types/Posts.ts)                                                                                                                                     | TypeScript     |   -5 |       0 |    -1 |    -6 |
| [src/types/interfaces.tsx](/src/types/interfaces.tsx)                                                                                                                         | TypeScript JSX | -121 |       0 |   -19 |  -140 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details
