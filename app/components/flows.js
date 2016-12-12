/* eslint max-len: 0 */

const flows = {
  divorce: {
    title: 'Divorce',
    question: {
      text: 'Have you or your spouse filed for a divorce?',
      yes: {
        error: 'Please call our hotline: (504) 355-0970',
      },
      no: {
        question: {
          text: 'Are either you or your spouse represented by an attorney?',
          yes: {
            error: 'Due to Legal Ethics Concerns, if you are represented by an attorney we cannot assist with this matter. If you spouse is represented, please call our Hotline: 504-355-0970',
          },
          no: {
            question: {
              text: 'Do you have any minor children of the marriage?',
              yes: {
                question: {
                  text: 'Have you been living seperate and apart for 365 days?',
                  yes: {
                    question: {
                      text: 'Do you have any community property that needs to be divided?',
                      yes: {
                        error: 'Please call our hotline: (504) 355-0970',
                      },
                      no: {
                        question: {
                          text: 'Is this a covenant marriage?',
                          yes: {
                            error: 'Please call our hotline: (504) 355-0970',
                          },
                          no: {
                            question: {
                              text: 'Are you or your spouse active members of the U.S. Armed Forces?',
                              yes: {
                                error: 'Please call our hotline: (504) 355-0970',
                              },
                              no: {
                                question: {
                                  text: 'Have you or your spouse lived in Louisiana for the last 6 months?',
                                  yes: {
                                    success: 'success',
                                  },
                                  no: {
                                    error: 'Please call our hotline: (504 355-0970)',
                                  },
                                },
                              },
                            },
                          },
                        },
                      },
                    },
                  },
                  no: {
                    error: 'Please call hotline',
                  },
                },
              },
              no: {
                question: {
                  text: 'Have you been living seperate and apart for 180 days?',
                  yes: {
                    success: 'success',
                  },
                  no: {
                    error: 'Please call our hotline: (504 355-0970)',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  child_support: {
    title: 'Child Support',
    question: {
      text: 'Is there a child support order in place from the state of Louisiana',
      yes: {
        question: {
          text: 'Are you seeking to modify the current order?',
          yes: {
            question: {
              text: 'Are you names a party to the case?',
              yes: {
                success: 'You are eligible for online assistance through this kiosk. Create your user profile and access free legal chat and documents here.',
              },
              no: {
                error: 'Please call our hotline: 504-355-0970',
              },
            },
          },
        },
      },
      no: {
        question: {
          text: 'Are you trying to establish Child Support',
          yes: {
            question: {
              text: 'Has the paternity been established?',
              yes: {
                question: {
                  text: 'Does the child live in Louisiana',
                  yes: {
                    success: 'You are eligible for online assistance through this kiosk. Create your user profile and access free legal chat and documents here.',
                  },
                  no: {
                    error: 'Please call our hotline: 504-355-0970',
                  },
                },
              },
              no: {
                error: 'Please call our hotline: 504-355-0970',
              },
            },
          },
          no: {
            error: 'Please call our hotline: 504-355-0970',
          },
        },
      },
    },
  },
  custody: {
    title: 'Custody',
    question: {
      text: 'Is there a custody order in place?',
      yes: {
        question: {
          text: 'Are you seeking to modify the current order?',
          yes: {
            question: {
              text: 'Was your order granted by civil court or juvenile court?',
              yes: {
                question: {
                  text: 'Was the order granted in Louisiana?',
                  yes: {
                    question: {
                      text: 'Are you a named party to the case?',
                      yes: {
                        success: 'You are eligible for assistance through this kiosk. Create your user profile and acess free legal chat and documents HERE.',
                      },
                      no: {
                        error: 'Please call our hotline at 504-355-0970',
                      },
                    },
                  },
                  no: {
                    error: 'Please call our hotline at 504-355-0970',
                  },
                },
              },
              no: {
                error: 'Please call our hotline at 504-355-0970',
              },
            },
          },
        },
      },
      no: {
        question: {
          text: 'Are you trying to establish custody/visitations',
          yes: {
            question: {
              text: 'Are you the father?',
              yes: {
                question: {
                  text: 'Has your paternity been established? (Is your name on the childs birth certificate?)',
                  yes: {
                    success: 'You are eligible for assistance through this kiosk. Create your user profile and acess free legal chat and documents HERE.',
                  },
                  no: {
                    error: 'Please call our hotline at 504-355-0970',
                  },
                },
              },
              no: {
                success: 'You are eligible for assistance through this kiosk. Create your user profile and acess free legal chat and documents HERE.',
              },
            },
          },
          no: {
            error: 'Please call our hotline at 504-355-0970',
          },
        },
      },
    },
  },
  dv: {
    title: 'Domestic Violence',
    question: {
      text: 'Are you or your minor child a victim of Abuse?',
      yes: {
        question: {
          text: 'Is the abuser your: Spouse, Former Spouse, Dating Partner, Parent, Child, Stepparent, Stepchild, Foster Parent, Foster Child, Grandparent, Grandchild?',
          yes: {
            question: {
              text: 'Are you seeking a protective order',
              yes: {
                success: 'You are eligible for online assistance through this kiosk. Create your user profile and access free legal chat and documents here.',
              },
              no: {
                error: 'Please call our hotline: 504-355-0970',
              },
            },
          },
          no: {
            question: {
              text: 'Were you the victim of stalking or cyberstalking by a stranger or acquaintance?',
              yes: {
                question: {
                  text: 'Are you seeking a Protective order?',
                  yes: {
                    success: 'You are eligible for online assistance through this kiosk. Create your user profile and access free legal chat and documents here.',
                  },
                  no: {
                    error: 'Please call our hotline: 504-355-0970',
                  },
                },
              },
              no: {
                error: 'Please call our hotline: 504-355-0970',
              },
            },
          },
        },
      },
      no: {
        error: 'Please call our hotline: 504-355-0970',
      },
    },
  },
  adoption: {
    title: 'Visitiation',
    question: {
      text: 'Are you the parent of the child?',
      yes: {
        question: {
          text: 'Is there a custoy/visitation order in place',
          yes: {
            question: {
              text: 'Are you trying to change the visitation order?',
              yes: {
                question: {
                  text: 'Were you ever accused of Domestic Violence/sexual or physcial against the child or a parent of the child?',
                  yes: {
                    error: 'Please call our hotline: 504-355-0970',
                  },
                  no: {
                    question: {
                      text: 'Is there any material change in the circumstances? Or you are unhappy with the Judgement?',
                      yes: {
                        question: {
                          text: 'Are you named a party to the case?',
                          yes: {
                            success: 'You are eligible for online assistance through this kiosk. Create your user profile and access free legal chat and documents here.',
                          },
                          no: {
                            error: 'Please call our hotline: 504-355-0970',
                          },
                        },
                      },
                      no: {
                        error: 'Please call our hotline: 504-355-0970',
                      },
                    },
                  },
                },
              },
              no: {
                error: 'Please call our hotline: 504-355-0970',
              },
            },
          },
          no: {
            error: 'Please call our hotline: 504-355-0970',
          },
        },
      },
      no: {},
    },
  },
};

export default flows;
