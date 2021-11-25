import * as React from 'react';
import "react-native-get-random-values";
import "@ethersproject/shims";

import Navigation from './navigation';
import {store} from './store'
import { Provider } from 'react-redux'

const App = () => {
	return (
		<Provider store={store}>
			<Navigation>
			</Navigation>
		</Provider>
	);
};


export default App;
