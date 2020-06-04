import React from 'react';
import AppRouter from './routers/AppRouter';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { SnackbarProvider } from 'notistack';



const App = () => ( // parent component.
  <MuiThemeProvider>
    <SnackbarProvider maxSnack={2} // toaster is used to error handeler. 
      >
      <AppRouter />
    </SnackbarProvider>
  </MuiThemeProvider>
);

export default App;