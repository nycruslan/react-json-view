import JsonViewer from './components/JsonViewer';

function App() {
  const data = {
    user: {
      id: 1,
      test: null,
      boolean: true,
      empty: {},
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
      roles: ['user', 'admin'],
      preferences: {
        theme: 'dark',
        notifications: true,
      },
    },
    transactionSummary: {
      lastTransactionDate: '2024-02-07T14:48:00.000Z',
      pendingTransactions: 2,
      transactionList: [
        {
          id: 'txn_01',
          amount: 100.0,
          status: 'completed',
        },
        {
          id: 'txn_02',
          amount: 50.0,
          status: 'pending',
        },
      ],
    },
    accountSummary: {
      accountType: 'Checking',
      balance: {
        current: 1000.0,
        available: 950.0,
      },
    },
    iconList: ['home', 'settings', 'logout'],
    structuredContentList: {
      section1: {
        header: 'Overview',
        content: 'Some overview content',
      },
      section2: {
        header: 'Details',
        content: 'Detailed information here',
      },
    },
  };

  return (
    <div>
      <JsonViewer data={data} rootName='data' expandLevel={1} />
    </div>
  );
}

export default App;
