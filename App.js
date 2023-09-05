//screens
import { Provider } from 'react-redux';
import RootStack from './screens/navigators/RootStack';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootStack />
    </Provider>
  )
  // return <Welcome />;
}

// https://www.youtube.com/watch?v=tZVKk-V0Xko&list=PLk8gdrb2DmCicLTZJWC2cCTFXloTBMBCt&index=2

/*
      clientId: '175142944378-g6u6ijon4tem0dmcktb2m1ncjq7t0nes.apps.googleusercontent.com',
      androidClientId: `175142944378-p94dqja9kjhnmdt5oncf7qpvdjoulr1r.apps.googleusercontent.com`,
      iosClientId: `175142944378-5ele4obm50pe6ok3dm5dvoq6etb572jr.apps.googleusercontent.com`,


      fingerPrint : 3a:5d:77:e0:01:65:39:4e:01:93:1c:35:2c:67:58:eb:c8:31:ef:d7
*/
