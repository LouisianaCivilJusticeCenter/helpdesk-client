/* eslint max-len: 0 */
const error = 'Please call our hotline at: 1-800-310-7029';
const success = 'You are eligible for online assistance through this kiosk. Create your user profile and access free legal chat and documents here.';

const flows = {
  divorce: {
    title: 'Divorce',
    link: 'divorce',
    question: {
      text: 'Have you or your spouse filed for a divorce?',
      yes: {
        error,
      },
      no: {
        question: {
          text: 'Are either you or your spouse represented by an attorney?',
          yes: {
            error: 'Due to legal ethics concerns, if you are represented by an attorney we cannot assist with this matter. If you spouse is represented, please call our Hotline: 1-800-310-7029',
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
                        error,
                      },
                      no: {
                        question: {
                          text: 'Is this a covenant marriage?',
                          yes: {
                            error,
                          },
                          no: {
                            question: {
                              text: 'Are you or your spouse active members of the U.S. Armed Forces?',
                              yes: {
                                error,
                              },
                              no: {
                                question: {
                                  text: 'Have you or your spouse lived in Louisiana for the last 6 months?',
                                  yes: {
                                    success,
                                  },
                                  no: {
                                    error,
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
                    error,
                  },
                },
              },
              no: {
                question: {
                  text: 'Have you been living seperate and apart for 180 days?',
                  yes: {
                    question: {
                      text: 'Do you have any community property that needs to be divided?',
                      yes: {
                        error,
                      },
                      no: {
                        question: {
                          text: 'Is this a covenant marriage?',
                          yes: {
                            error,
                          },
                          no: {
                            question: {
                              text: 'Are you or your spouse active members of the U.S. Armed Forces?',
                              yes: {
                                error,
                              },
                              no: {
                                question: {
                                  text: 'Have you or your spouse lived in Louisiana for the last 6 months?',
                                  yes: {
                                    success,
                                  },
                                  no: {
                                    error,
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
                    error,
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
    link: 'child_support',
    question: {
      text: 'Is there a child support order in place from the state of Louisiana?',
      yes: {
        question: {
          text: 'Are you seeking to modify the current order?',
          yes: {
            question: {
              text: 'Are you named a party to the case?',
              yes: {
                success,
              },
              no: {
                error,
              },
            },
          },
        },
      },
      no: {
        question: {
          text: 'Are you trying to establish Child Support?',
          yes: {
            question: {
              text: 'Has the paternity been established?',
              yes: {
                question: {
                  text: 'Does the child live in Louisiana?',
                  yes: {
                    success,
                  },
                  no: {
                    error,
                  },
                },
              },
              no: {
                error,
              },
            },
          },
          no: {
            error,
          },
        },
      },
    },
  },
  custody: {
    title: 'Custody',
    link: 'custody',
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
                        error: 'Please call our hotline at 1-800-310-7029',
                      },
                    },
                  },
                  no: {
                    error: 'Please call our hotline at 1-800-310-7029',
                  },
                },
              },
              no: {
                error: 'Please call our hotline at 1-800-310-7029',
              },
            },
          },
          no: {
            error,
          },
        },
      },
      no: {
        question: {
          text: 'Are you trying to establish custody?',
          yes: {
            question: {
              text: 'Are you the father?',
              yes: {
                question: {
                  text: 'Has your paternity been established (is your name on the child’s birth certificate? Or, if not, have you legally established your paternity in some other way)?',
                  yes: {
                    success: 'You are eligible for assistance through this kiosk. Create your user profile and acess free legal chat and documents HERE.',
                  },
                  no: {
                    error: 'Please call our hotline at 1-800-310-7029',
                  },
                },
              },
              no: {
                success: 'You are eligible for assistance through this kiosk. Create your user profile and acess free legal chat and documents HERE.',
              },
            },
          },
          no: {
            error: 'Please call our hotline at 1-800-310-7029',
          },
        },
      },
    },
  },
  adoption: {
    title: 'Visitation',
    link: 'adoption',
    question: {
      text: 'Are you the parent of the child?',
      yes: {
        error: 'Please use the custody button on the homepage.',
      },
      no: {
        question: {
          text: 'Are you a grandparent or sibling of the child?',
          no: {
            success,
          },
          yes: {
            question: {
              text: 'Are the parents of the child married?',
              yes: {
                error,
              },
              no: {
                success,
              },
            },
          },
        },
      },
    },
  },
  dv: {
    title: 'Domestic Violence',
    link: 'dv',
    question: {
      text: 'Are you, or is your minor child, a victim of abuse?',
      yes: {
        question: {
          text: 'Is the abuser your: spouse, former spouse, dating partner, parent, child, stepparent, stepchild, foster parent, foster child, grandparent, or grandchild?',
          yes: {
            question: {
              text: 'Are you seeking a Protective Order?',
              yes: {
                success,
              },
              no: {
                error,
              },
            },
          },
          no: {
            question: {
              text: 'Were you the victim of stalking or cyberstalking by a stranger or acquaintance?',
              yes: {
                question: {
                  text: 'Are you seeking a Protective Order?',
                  yes: {
                    success,
                  },
                  no: {
                    error,
                  },
                },
              },
              no: {
                error,
              },
            },
          },
        },
      },
      no: {
        error,
      },
    },
  },
};

export default flows;
