import { BoardProps } from "../../app/utils/interface";

export const staticBoards: BoardProps[] = [
  {
    name: "Platform Launch",
    _id: "YA6swbl4vV",
    columns: [
      {
        _id: "YUWZ-4AWZh",
        name: "Todo",
        tasks: [
          {
            _id: "relo0vxxKg",
            title: "Build UI for onboarding flow",
            description: "",
            status: "Todo",
            subtasks: [
              {
                _id: "KjV0MXpA_e",
                title: "Sign up page",
                isCompleted: true
              },
              {
                _id: "qFR4bzHUOY",
                title: "Sign in page",
                isCompleted: false
              },
              {
                _id: "2DlvopS51T",
                title: "Welcome page",
                isCompleted: false
              }
            ]
          },
          {
            _id: "obpacE6e4Z",
            title: "Build UI for search",
            description: "",
            status: "Todo",
            subtasks: [
              {
                _id: "2IwgdQksp9",
                title: "Search page",
                isCompleted: false
              }
            ]
          },
          {
            _id: "Hl-dBq-xTH",
            title: "Build settings UI",
            description: "",
            status: "Todo",
            subtasks: [
              {
                _id: "s6HwsLKbnf",
                title: "Account page",
                isCompleted: false
              },
              {
                _id: "kXEINhekr2",
                title: "Billing page",
                isCompleted: false
              }
            ]
          },
          {
            _id: "yEhUvsWIu5",
            title: "QA and test all major user journeys",
            description:
              "Once we feel version one is ready, we need to rigorously test it both internally and externally to identify any major gaps.",
            status: "Todo",
            subtasks: [
              {
                _id: "gAGF181ltk",
                title: "Internal testing",
                isCompleted: false
              },
              {
                _id: "cnozYJyWxk",
                title: "External testing",
                isCompleted: false
              }
            ]
          },
          {
            _id: "mPKSs_xK_n",
            title: "Mass deletion",
            description: " Remove all columns and tasks and cannot be reversed",
            status: "Todo",
            subtasks: [
              {
                _id: "H83DIjswzZ",
                title: "Highlight errors",
                isCompleted: true
              },
              {
                _id: "cdZDL6f1-e",
                title: "Seperate authentic data",
                isCompleted: false
              },
              {
                _id: "Sj3Rsz2YOt",
                title: "Run command for deletion ",
                isCompleted: false
              }
            ]
          },
          {
            _id: "STvzXuKt7B",
            title: "Modify user journeys",
            description: "",
            status: "Todo",
            subtasks: [
              {
                _id: "iNCS17znLz",
                title: "Create phase one",
                isCompleted: false
              },
              {
                _id: "Ih9OSqA28G",
                title: "Implement corrections on phase two and three",
                isCompleted: true
              },
              {
                _id: "-57ygHUsjV",
                title: "Remove and isolate rejected patterns",
                isCompleted: true
              },
              {
                _id: "mvNv5txYLa",
                title: "Define structure for phase four and five",
                isCompleted: false
              }
            ]
          },
          {
            _id: "hJ8R20F9ER",
            title: "Destructure Web App",
            description:
              "Break components and web design into smaller structure, send files to dev team ",
            status: "Todo",
            subtasks: [
              {
                _id: "5ZLWkz3V3h",
                title: "Revisit design system",
                isCompleted: false
              },
              {
                _id: "SeFfP1CxcZ",
                title: "Break down codebase and assets",
                isCompleted: false
              }
            ]
          }
        ]
      },
      {
        _id: "XJku-oyYjM",
        name: "Doing",
        tasks: [
          {
            _id: "-2IFIJkDIM",
            title: "Design settings and search pages",
            description: "",
            status: "Doing",
            subtasks: [
              {
                _id: "2_ptzgYMQY",
                title: "Settings - Account page",
                isCompleted: true
              },
              {
                _id: "3WvKR6aXT4",
                title: "Settings - Billing page",
                isCompleted: true
              },
              {
                _id: "gCA0_SIDna",
                title: "Search page",
                isCompleted: false
              }
            ]
          },
          {
            _id: "PHoqfE5NVg",
            title: "Add account management endpoints",
            description: "",
            status: "Doing",
            subtasks: [
              {
                _id: "PsH3DlOLdf",
                title: "Upgrade plan",
                isCompleted: true
              },
              {
                _id: "j9uZWr65g_",
                title: "Cancel plan",
                isCompleted: true
              },
              {
                _id: "ccet7mSeuR",
                title: "Update payment method",
                isCompleted: false
              }
            ]
          },
          {
            _id: "279sxbsT5Z",
            title: "Design onboarding flow",
            description: "",
            status: "Doing",
            subtasks: [
              {
                _id: "GGvJnla2eO",
                title: "Sign up page",
                isCompleted: true
              },
              {
                _id: "BdztzCrL3e",
                title: "Sign in page",
                isCompleted: false
              },
              {
                _id: "tcf2kwOxmI",
                title: "Welcome page",
                isCompleted: false
              }
            ]
          },
          {
            _id: "oB5cb3sJpF",
            title: "Add search enpoints",
            description: "",
            status: "Doing",
            subtasks: [
              {
                _id: "u9J4FmVKvq",
                title: "Add search endpoint",
                isCompleted: true
              },
              {
                _id: "JGttvZriyL",
                title: "Define search filters",
                isCompleted: false
              }
            ]
          },
          {
            _id: "krcA0rgcb1",
            title: "Add authentication endpoints",
            description: "",
            status: "Doing",
            subtasks: [
              {
                _id: "Hh5TuecvUZ",
                title: "Define user model",
                isCompleted: true
              },
              {
                _id: "tiFW1sUw5I",
                title: "Add auth endpoints",
                isCompleted: false
              }
            ]
          },
          {
            _id: "q8LagBJHbB",
            title:
              "Research pricing points of various competitors and trial different business models",
            description:
              "We know what we're planning to build for version one. Now we need to finalise the first pricing model we'll use. Keep iterating the subtasks until we have a coherent proposition.",
            status: "Doing",
            subtasks: [
              {
                _id: "yhlpk2Fq1W",
                title: "Research competitor pricing and business models",
                isCompleted: true
              },
              {
                _id: "Sw6YOVTYt5",
                title: "Outline a business model that works for our solution",
                isCompleted: false
              },
              {
                _id: "t5Qy8LGzSw",
                title:
                  "Talk to potential customers about our proposed solution and ask for fair price expectancy",
                isCompleted: false
              }
            ]
          }
        ]
      },
      {
        _id: "Ive3jwVb8D",
        name: "Done",
        tasks: [
          {
            _id: "NfHnhxFgnP",
            title: "Conduct 5 wireframe tests",
            description:
              "Ensure the layout continues to make sense and we have strong buy-in from potential users.",
            status: "Done",
            subtasks: [
              {
                _id: "EOdom04Pay",
                title: "Complete 5 wireframe prototype tests",
                isCompleted: true
              }
            ]
          },
          {
            _id: "GqnYwlsJbp",
            title: "Create wireframe prototype",
            description:
              "Create a greyscale clickable wireframe prototype to test our asssumptions so far.",
            status: "Done",
            subtasks: [
              {
                _id: "W6ofrw1mDp",
                title: "Create clickable wireframe prototype in Balsamiq",
                isCompleted: true
              }
            ]
          },
          {
            _id: "RJKx1QNg-r",
            title: "Review results of usability tests and iterate",
            description:
              "Keep iterating through the subtasks until we're clear on the core concepts for the app.",
            status: "Done",
            subtasks: [
              {
                _id: "anJ7MQJqUc",
                title:
                  "Meet to review notes from previous tests and plan changes",
                isCompleted: true
              },
              {
                _id: "jm-ZBDr7T9",
                title: "Make changes to paper prototypes",
                isCompleted: true
              },
              {
                _id: "ethVewHXJ3",
                title: "Conduct 5 usability tests",
                isCompleted: true
              }
            ]
          },
          {
            _id: "nc9m_MCd_1",
            title:
              "Create paper prototypes and conduct 10 usability tests with potential customers",
            description: "",
            status: "Done",
            subtasks: [
              {
                _id: "lfRq0IGNOz",
                title: "Create paper prototypes for version one",
                isCompleted: true
              },
              {
                _id: "f_4lY2IMEx",
                title: "Complete 10 usability tests",
                isCompleted: true
              }
            ]
          },
          {
            _id: "XMq0GHNhoJ",
            title: "Market discovery",
            description:
              "We need to define and refine our core product. Interviews will help us learn common pain points and help us define the strongest MVP.",
            status: "Done",
            subtasks: [
              {
                _id: "BrKhYCOyi_",
                title: "Interview 10 prospective customers",
                isCompleted: true
              }
            ]
          },
          {
            _id: "OESftrUh80",
            title: "Competitor analysis",
            description: "",
            status: "Done",
            subtasks: [
              {
                _id: "P3bvG3wlRT",
                title: "Find direct and indirect competitors",
                isCompleted: true
              },
              {
                _id: "Eki7xpE7Q2",
                title: "SWOT analysis for each competitor",
                isCompleted: true
              }
            ]
          },
          {
            _id: "MjYNJIw0Mf",
            title: "Research the market",
            description:
              "We need to get a solid overview of the market to ensure we have up-to-date estimates of market size and demand.",
            status: "Done",
            subtasks: [
              {
                _id: "yRDeFFnlux",
                title: "Write up research analysis",
                isCompleted: true
              },
              {
                _id: "ufo5U_l64c",
                title: "Calculate TAM",
                isCompleted: true
              }
            ]
          }
        ]
      }
    ]
  },
  {
    _id: "bUsvK8MSEl",
    name: "Marketing Plan",
    columns: [
      {
        _id: "tazj1r61lW",
        name: "Todo",
        tasks: [
          {
            _id: "3qdAr2CvJC",
            title: "Plan Product Hunt launch",
            description: "",
            status: "Todo",
            subtasks: [
              {
                _id: "2G5_G7_pvC",
                title: "Find hunter",
                isCompleted: false
              },
              {
                _id: "GAX-z6oyb7",
                title: "Gather assets",
                isCompleted: false
              },
              {
                _id: "MGqkrJshvN",
                title: "Draft product page",
                isCompleted: false
              },
              {
                _id: "CfKPe4YZwn",
                title: "Notify customers",
                isCompleted: false
              },
              {
                _id: "a-mzm6W7EU",
                title: "Notify network",
                isCompleted: false
              },
              {
                _id: "eGS-hXj4Hd",
                title: "Launch!",
                isCompleted: false
              }
            ]
          },
          {
            _id: "NgcxzFZqR-",
            title: "Share on Show HN",
            description: "",
            status: "",
            subtasks: [
              {
                _id: "sUtLpIDoPG",
                title: "Draft out HN post",
                isCompleted: false
              },
              {
                _id: "aBzoU53Kyo",
                title: "Get feedback and refine",
                isCompleted: false
              },
              {
                _id: "-10CNK8jN1",
                title: "Publish post",
                isCompleted: false
              }
            ]
          },
          {
            _id: "9wqnjOAqZq",
            title: "Write launch article to publish on multiple channels",
            description: "",
            status: "",
            subtasks: [
              {
                _id: "qyRjabBVo5",
                title: "Write article",
                isCompleted: false
              },
              {
                _id: "U_n63DUWtL",
                title: "Publish on LinkedIn",
                isCompleted: false
              },
              {
                _id: "Co8ZU4ARa1",
                title: "Publish on Inndie Hackers",
                isCompleted: false
              },
              {
                _id: "5OPQd2vlxg",
                title: "Publish on Medium",
                isCompleted: false
              }
            ]
          }
        ]
      },
      {
        _id: "jyMWP8SJ3W",
        name: "Doing",
        tasks: []
      },
      {
        _id: "IDLVntt0HM",
        name: "Done",
        tasks: []
      }
    ]
  },
  {
    _id: "JkZoPQ3c6v",
    name: "Roadmap",
    columns: [
      {
        _id: "2-nNvhPROX",
        name: "Now",
        tasks: [
          {
            _id: "JqNauc9Pwp",
            title: "Launch version one",
            description: "",
            status: "",
            subtasks: [
              {
                _id: "wxnyrwBDxK",
                title: "Launch privately to our waitlist",
                isCompleted: false
              },
              {
                _id: "3ccpQMfReV",
                title: "Launch publicly on PH, HN, etc.",
                isCompleted: false
              }
            ]
          },
          {
            _id: "_Vlr0AflrB",
            title: "Review early feedback and plan next steps for roadmap",
            description:
              "Beyond the initial launch, we're keeping the initial roadmap completely empty. This meeting will help us plan out our next steps based on actual customer feedback.",
            status: "",
            subtasks: [
              {
                _id: "UWZSmooTh4",
                title: "Interview 10 customers",
                isCompleted: false
              },
              {
                _id: "LAIEDgE1Xm",
                title: "Review common customer pain points and suggestions",
                isCompleted: false
              },
              {
                _id: "47I1iMMnn6",
                title: "Outline next steps for our roadmap",
                isCompleted: false
              }
            ]
          }
        ]
      },
      {
        _id: "xXOXolSIG4",
        name: "Next",
        tasks: []
      },
      {
        _id: "iALr6fXjvD",
        name: "Later",
        tasks: []
      }
    ]
  }
];
