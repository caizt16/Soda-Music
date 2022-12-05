# Soda-Music
Created with CodeSandbox
Run demo on: https://k094e0.csb.app/

use npm or yarn to install dependencies.
<img width="263" alt="Screenshot 2022-12-03 at 4 04 00 PM" src="https://user-images.githubusercontent.com/30317521/205467435-714c20fb-ffc8-4043-8e59-1817f6804ebb.png">

## reproduce steps
1. replace the `clientId` in `spotify.js` with your client id shown in the Spotify developer dashboard:
https://developer.spotify.com/dashboard/applications

2. replace the endpoint https://1dmrpbm5k9.execute-api.us-west-2.amazonaws.com/default/fetchDynamoDBdata with your own backend storage, ample data format would look like 

```         
{
            "id":"soda",
            "matches":[
               {
                  "Score":47,
                  "Genres":[
                     "POP",
                     "Dance POP"
                  ],
                  "Tracks":{
                     "MediumTerm":[
                        "6TodWdTSDfzwgYynTZSvJn"
                     ],
                     "ShortTerm":[
                        "35ovElsgyAtQwYPYnZJECg"
                     ],
                     "LongTerm":[
                        "7AE1oyRpPGoSwDs8b9XBO0"
                     ]
                  },
                  "User":"HsinYa",
                  "Artists":[
                     "06HL4z0CvFAxyc27GXpf02",
                     "1AhjOkOLkbHUfcHDSErXQs",
                     "41MozSoPIsD1dJM0CLPjZF"
                  ]
               },
               {
                  "Score":34,
                  "Genres":[
                     "Pop",
                     "Rap"
                  ],
                  "Tracks":{
                     "MediumTerm":[
                        
                     ],
                     "ShortTerm":[
                        "5jQI2r1RdgtuT8S3iG8zFC"
                     ],
                     "LongTerm":[
                        
                     ]
                  },
                  "User":"Taiii",
                  "Artists":[
                     "3TVXtAsR1Inumwj472S9r4",
                     "4V8LLVI7PbaPR0K2TGSxFF",
                     "06HL4z0CvFAxyc27GXpf02"
                  ]
               },
               {
                  "Score":25,
                  "Genres":[
                     
                  ],
                  "Tracks":{
                     "MediumTerm":[
                        "6TodWdTSDfzwgYynTZSvJn"
                     ],
                     "ShortTerm":[
                        "0iWFz0Q5Qha9bx325ocFWq"
                     ],
                     "LongTerm":[
                        "7AE1oyRpPGoSwDs8b9XBO0"
                     ]
                  },
                  "User":"JZ",
                  "Artists":[
                     "1AhjOkOLkbHUfcHDSErXQs",
                     "3MZsBdqDrRTJihTHQrO6Dq",
                     "3TVXtAsR1Inumwj472S9r4"
                  ]
               },
               {
                  "Score":13,
                  "Genres":[
                     "pop"
                  ],
                  "Tracks":{
                     "MediumTerm":[
                        "0iWFz0Q5Qha9bx325ocFWq"
                     ],
                     "ShortTerm":[
                        "7wmFsS43fO8vAg0vcr776N"
                     ],
                     "LongTerm":[
                        "0iWFz0Q5Qha9bx325ocFWq"
                     ]
                  },
                  "User":"James Tsai",
                  "Artists":[
                     "06HL4z0CvFAxyc27GXpf02"
                  ]
               }
            ]
         }
         
         ```
