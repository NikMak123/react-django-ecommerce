import ReactDOM from 'react-dom';
import App from './App';
// redux
import { Provider } from "react-redux";
import store from "./redux/store/store"
// index.js (or App.js if that's your entry point)
import 'bootstrap/dist/css/bootstrap.min.css';
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import 'aos/dist/aos.css';


const theme = createTheme({
  palette: {
    primary: { main: "#212121" },
    grey: { 600: "#757575" },
  },
});


ReactDOM.render( 
<Provider store={store} >
<ThemeProvider theme={theme}>
      <App />
    </ThemeProvider> 
</Provider>,

    document.getElementById('root')
);
