/*
The following contains information about the City of Austin's water restriction stages as they apply to automatic irrigation systems. 
Capable controllers may communicate directly with this page to inform the end user of the current restriction and what that restriction allows. 
Note that these restrictions tell a customer when they are allowed to water even though supplemental watering may not be needed and 
that "schools" in this context only refer to public schools. Private schools follow commercial/multifamily restrictions. Also, there are 
exemptions within the water conservation code, such as for drip stations within an automatic system, that are not addressed within the 
information below.

For more information about Austin's water restrictions and water conservation in general, visit www.waterwiseaustin.org or call 512-974-2199.

Conservation Stage:
  No watering between 10:00 AM and 7:00 PM
  Commercial/Multifamily odd addresses can water Friday
  Commercial/Multifamily odd addresses can water Tuesday
  Residential odd addresses can water Wednesday
  Residential even addresses can water Thursday
  Public Schools can water Monday
  
Stage I:
  No watering between 8:00 AM and 7:00 PM
  Commercial/Multifamily can water Tuesday and Friday
  Residential odd addresses can water Wednesday
  Residential even addresses can water Thursday
  Public Schools can water Monday
  
Stage II:
  No watering between 5:00 AM and 7:00 PM
  Commercial/Multifamily odd addresses can water Friday
  Commercial/Multifamily even addresses can water Tuesday
  Residential odd addresses can water Wednesday
  Residential even addresses can water Thursday
  Public Schools can water Monday
  
Stage III:
  No watering after 6:00 AM
  Commercial/Multifamily odd addresses can water Friday
  Commercial/Multifamily even addresses can water Tuesday
  Residential odd addresses can water Wednesday
  Residential even addresses can water Thursday
  Public Schools can water Monday
  
Stage IV:
  No automatic irrigation allowed

The following structure is a representation of a javascript object using the JSON (JavaScript Object Notation [http://www.json.org]) format.
This structure defines the City of Austin water restriction stages as they apply to automatic irrigation systems.
  
  Structure Components:
  
  "stages" is an ARRAY of STRINGs which match the water restriction stage names. The order of the STRINGs in the ARRAY is important. See the "rules" 
    definition for usage.
  
  "types" is an ARRAY of STRINGs which match the customer / property types distinguished in the restrictions. The order of the STRINGs 
    in the ARRAY is important. See the "rules" definition for usage.
  
  "days" is an ARRAY of STRINGs containing the days of the week in the required order. The order of the STRINGs in the ARRAY is important. 
    See the "rules" definition for usage.
  
  "current" is a NUMBER which specifies the current water restriction stage. The value is the specified index in the "stages" ARRAY.
  
  "effective" is a STRING containing the effective date / time, in ISO 8601 format, of the current water restriction stage.
  
  "rules" is an ARRAY containing rules for each possible water restriction stage. Each item in the ARRAY references a particular stage.
    The index of the item (stage) in this array corresponds to the index in the "stages" ARRAY. Below is a further description of an item in 
    the "rules" ARRAY, referenced as rules[stage index].
    
    Each rules[stage index] is an ARRAY containing rules for each customer / property type within a stage. Each item in the ARRAY references a 
      particular type. The index of the item (type) in this array corresponds to the index in the "types" ARRAY. Below is a further description of an 
      item in the rules[stage index] ARRAY, referenced as rules[stage index][type index].
      
      Each rules[stage index][type index] is an ARRAY of OBJECTs containing rules for specific address ranges within a customer / property type 
        and stage. The address ranges are specified as street numbers ending in an odd digit, an even digit, or all street numbers. Below is a 
        further description of an item in the rules[stage index][type index] ARRAY, referenced as rules[stage index][type index][address index].
        
        Each rules[stage index][type index][address index] OBJECT has the following structure:
        
        "interval" is a NUMBER which specifies the number of days in the watering interval or period. For example, a value of 7 would mean 
          that watering is allowed weekly according to the watering rules. A value of 0 (zero) would mean that watering is not allowed. See 
          the "day" definition for a description of what days of the week are valid to water in the interval.
        
        "address" is an ARRAY of NUMBERs which match the last digit of the street number of property addresses encompassed by the rules. For 
          example, if "address" contains [1,3,5,7,9], then the rules would apply to addresses like 123 Main ST or 1005 First ST, but not 120 Main ST.
        
        "day" is an ARRAY of NUMBERs which specifies the valid watering days of the week encompassed by the rules. The values correspond to the 
          indices of the "days" ARRAY, which contains the STRING descriptions of the days of the week as reference. If the "day" ARRAY has no 
          items, then watering is not allowed.
        
        "time" is an ARRAY of OBJECTs containing daily time periods that watering is allowed according to the watering rules. If the "time" ARRAY has 
          no items, then watering is not allowed. Each "time" OBJECT has the following structure:
          
          "from" is a STRING which specifies the beginning time of the time period using a 24-hour clock. The format of the STRING is "HHMM", which 
            is a 2 digit designation for hours and a 2 digit designation for minutes (with leading zero for hours or minutes less than 10).
          
          "to" is a STRING which specifies the ending time of the time period using a 24-hour clock. The format of the STRING is the same as "from".
  
  Example Usage:
  
  In the following example the entire JSON structure is assigned to a variable called AUTO_SCHEDULE. For the example, the current stage and a residential 
    property type will be selected.
    
    > AUTO_SCHEDULE.rules[AUTO_SCHEDULE.current] will select the current stage
    > AUTO_SCHEDULE.rules[AUTO_SCHEDULE.current][0] will select the residential property type in the current stage based on the AUTO_SCHEDULE.types array
    > AUTO_SCHEDULE.rules[AUTO_SCHEDULE.current][0][0] will select the rules for a range of addresses; this example assumes that range contains the 
      appropriate value; additional javascript functionality would be used to determine the appropriate array index
    > AUTO_SCHEDULE.rules[AUTO_SCHEDULE.current][0][0].address will return the applicable address array
    > AUTO_SCHEDULE.rules[AUTO_SCHEDULE.current][0][0].interval will return the numeric interval
    > AUTO_SCHEDULE.rules[AUTO_SCHEDULE.current][0][0].day will return the watering days array
    > AUTO_SCHEDULE.rules[AUTO_SCHEDULE.current][0][0].time will return the watering times array
*/

var AUTO_SCHEDULE = 
{
  "stages":[
    "Conservation",
    "Stage 1",
    "Stage 2",
    "Stage 3",
    "Stage 4"
  ],
  "effective":"2016-05-17T00:00:00-06:00",
  "current":0,
  "types":[
    "residential",
    "commercial",
    "school"
  ],
  "rules":[
    [
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0959"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            3
          ],
          "interval":7,
          "address":[
            1,
            3,
            5,
            7,
            9
          ]
        },
        {
          "time":[
            {
              "from":"0000",
              "to":"0959"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            4
          ],
          "interval":7,
          "address":[
            2,
            4,
            6,
            8,
            0
          ]
        }
      ],
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0959"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            5
          ],
          "interval":7,
          "address":[
            1,
            3,
            5,
            7,
            9
          ]
        },
		{
          "time":[
            {
              "from":"0000",
              "to":"0959"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            2
          ],
          "interval":7,
          "address":[
            2,
            4,
            6,
            8,
            0
          ]
        }
      ],
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0959"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            1
          ],
          "interval":7,
          "address":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0
          ]
        }
      ]
    ],
    [
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0759"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            3
          ],
          "interval":7,
          "address":[
            1,
            3,
            5,
            7,
            9
          ]
        },
        {
          "time":[
            {
              "from":"0000",
              "to":"0759"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            4
          ],
          "interval":7,
          "address":[
            2,
            4,
            6,
            8,
            0
          ]
        }
      ],
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0759"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            5
          ],
          "interval":7,
          "address":[
            1,
            3,
            5,
            7,
            9
          ]
        },
		{
          "time":[
            {
              "from":"0000",
              "to":"0759"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            2
          ],
          "interval":7,
          "address":[
            2,
            4,
            6,
            8,
            0
          ]
        }
      ],
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0759"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            1
          ],
          "interval":7,
          "address":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0
          ]
        }
      ]
    ],
    [
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0459"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            3
          ],
          "interval":7,
          "address":[
            1,
            3,
            5,
            7,
            9
          ]
        },
        {
          "time":[
            {
              "from":"0000",
              "to":"0459"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            4
          ],
          "interval":7,
          "address":[
            2,
            4,
            6,
            8,
            0
          ]
        }
      ],
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0459"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            5
          ],
          "interval":7,
          "address":[
            1,
            3,
            5,
            7,
            9
          ]
        },
        {
          "time":[
            {
              "from":"0000",
              "to":"0459"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            2
          ],
          "interval":7,
          "address":[
            2,
            4,
            6,
            8,
            0
          ]
        }
      ],
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0459"
            },
            {
              "from":"1900",
              "to":"2359"
            }
          ],
          "day":[
            1
          ],
          "interval":7,
          "address":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0
          ]
        }
      ]
    ],
    [
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0559"
            }
          ],
          "day":[
            3
          ],
          "interval":7,
          "address":[
            1,
            3,
            5,
            7,
            9
          ]
        },
        {
          "time":[
            {
              "from":"0000",
              "to":"0559"
            }
          ],
          "day":[
            4
          ],
          "interval":7,
          "address":[
            2,
            4,
            6,
            8,
            0
          ]
        }
      ],
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0559"
            }
          ],
          "day":[
            5
          ],
          "interval":7,
          "address":[
            1,
            3,
            5,
            7,
            9
          ]
        },
        {
          "time":[
            {
              "from":"0000",
              "to":"0559"
            }
          ],
          "day":[
            2
          ],
          "interval":7,
          "address":[
            2,
            4,
            6,
            8,
            0
          ]
        }
      ],
      [
        {
          "time":[
            {
              "from":"0000",
              "to":"0559"
            }
          ],
          "day":[
            1
          ],
          "interval":7,
          "address":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0
          ]
        }
      ]
    ],
    [
      [
        {
          "time":[

          ],
          "day":[

          ],
          "interval":0,
          "address":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0
          ]
        }
      ],
      [
        {
          "time":[

          ],
          "day":[

          ],
          "interval":0,
          "address":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0
          ]
        }
      ],
      [
        {
          "time":[

          ],
          "day":[

          ],
          "interval":0,
          "address":[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            0
          ]
        }
      ]
    ]
  ],
  "days":[
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ]
}