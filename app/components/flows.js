const flows = {
  divorce: {
    title: 'this is title',
    question: {
      text: 'Have you or your spouse filed for a divorce?',
      yes: {
        error: 'Due to Legal Ethics Concerns...call hotline',
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
                    success: 'success',
                  },
                  no: {
                    error: 'Please call hotline',
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
};

export default flows;
