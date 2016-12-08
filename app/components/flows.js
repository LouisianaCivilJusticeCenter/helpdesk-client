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
                    error: 'last',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default flows;
