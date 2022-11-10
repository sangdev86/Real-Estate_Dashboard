import React from 'react';
import { AuthLayout, MainLayout } from './layouts';
import { Provider, useSelector } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { RootState } from 'src/app/root-reducer';
import { authRoutes, menuList } from './config/routes';
import { history } from './config/history';
import { BrowserRouter } from 'react-router-dom';
import store from './app/store';
import { createTheme, ThemeProvider } from '@mui/material/styles'; //customize theme MUI styles
import { Notification } from './components/Actions/Notification/Notification';
// import { Language } from './components/Actions/Language/Language';
import variabales from './assets/styles/base/variables.module.scss';
import './assets/styles/main.scss';

if (process.env.NODE_ENV === 'production') {
  console.log = () => {
    'chưa chia';
  };
}
const theme = createTheme({
  palette: {
    primary: {
      main: variabales.primary
    },
    secondary: {
      main: '#fff'
    },

    success: {
      main: '#2F9290',
      light: '#357a38'
    },
    error: { main: '#eb000d', light: '#eb000d' },
    background: {
      default: '#fff'
    },
    text: {}
  },
  typography: {
    fontFamily: variabales.fontfamily,
    fontSize: 16,

    h1: {
      //Headline 1x
      fontWeight: 'bold'
    },
    h2: {
      //Headline 2 or Title for page
      fontSize: '3.6rem',
      fontWeight: 'bold'
    },
    h3: {
      //Headline 3
      fontSize: '2.4rem',
      fontWeight: 'bold'
    },
    h4: {
      //Headline 4
      fontSize: '1.8rem',
      fontWeight: 'bold'
    },
    body1: {
      fontSize: '0.9rem'
    },
    body2: {
      fontSize: '1.2rem',
      fontWeight: 'lighter'
    },
    button: {
      // Paragraph or Title or button
      fontSize: '1.6rem',
      fontWeight: 'bold'
    },
    subtitle1: {
      // link
      fontSize: '1.4rem',
      fontStyle: 'italic',
      fontColor: '#FF4F38'
    },
    subtitle2: {
      //note or sub
      fontSize: '1.4rem',
      fontStyle: 'italic',
      fontColor: '#515151'
    }
  },

  components: {
    //input
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          backgroundColor: '#fff',
          borderRadius: '8px'
          // fontSize: 'rem'
        },
        notchedOutline: {
          borderColor: 'rgba(0,0,0,0.1) !important'
        },
        input: {
          ':focus': {
            boxShadow: variabales.boxShadowDark,
            borderRadius: '8px'
          }
        }
      }
    },
    // text input fill
    MuiInputBase: {
      styleOverrides: {
        root: {
          fontSize: variabales.inputFontSize
        },
        input: {
          // chus y
          // padding: '13px !important'
        }
      }
    },
    MuiTextField: {
      variants: [
        {
          props: { variant: 'outlined', color: 'primary' },
          style: {
            textTransform: 'none',
            ':hover': {
              borderColor: 'transparent'
            }
          }
        }
      ],
      defaultProps: {
        fullWidth: true
      },
      styleOverrides: {
        root: {
          ':hover': {
            border: 0
          }
        }
      }
    },
    MuiInput: {
      styleOverrides: {
        root: {
          outline: `1px solid transparent`
        }
      }
    },
    //playhoder
    MuiInputLabel: {
      styleOverrides: {
        root: {
          // textTransform: 'uppercase',
          fontSize: variabales.inputFontSize
        }
      }
    },
    //lable small

    // validator
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          color: '#d40303 !important',
          fontSize: variabales.inputFontSize
        }
      }
    },

    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: variabales.inputFontSize
        }
      }
    },
    //button
    MuiButton: {
      styleOverrides: {
        root: {
          ':disabled': {
            backgroundColor: variabales.disableButton,
            color: '#fff'
          },
          textTransform: 'none'
        }
      }
    },

    MuiFormLabel: {
      styleOverrides: {
        root: {
          // ':focus': {
          //   color: 'black'
          // }
        }
      }
    },

    //Alert
    MuiAlert: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem',
          backgroundColor: '#fff',
          color: '#1e1e1e',
          boxShadow: variabales.boxShadowDark
        }
      }
    },
    // MuiIconButton

    MuiIconButton: {
      styleOverrides: {
        root: {
          ':hover': {
            backgroundColor: variabales.bodyBg
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fontSize: '2.7rem'
        }
      }
    },
    // App bar
    MuiPaper: {
      styleOverrides: {
        root: {}
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          boxShadow: 'none'
        }
      }
    },
    MuiCollapse: {
      styleOverrides: {
        root: {
          transitionDuration: variabales.all300
        }
      }
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          transitionDuration: variabales.all300
        }
      }
    },
    MuiMenu: {
      styleOverrides: {
        root: {
          transitionDuration: variabales.all300
        }
      }
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: '1.6rem'
        }
      }
    },
    MuiTableContainer: {
      styleOverrides: {
        root: {
          minHeight: '650px'
        }
      }
    },
    MuiTablePagination: {
      styleOverrides: {
        root: {
          fontSize: '1.4rem'
        }
      }
    },
    MuiGrid: {
      styleOverrides: {
        root: {
          // textAlign: 'center'
        }
      }
    }
  }
});

const App: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  return (
    <ThemeProvider theme={theme}>
      <ConnectedRouter history={history}>
        <Notification />
        <BrowserRouter>
          {isLoggedIn ? (
            <MainLayout routes={menuList()} />
          ) : (
            <AuthLayout routesAndComponent={authRoutes} />
          )}
        </BrowserRouter>
      </ConnectedRouter>
      {/* <Box className={classes.language}>
        <Language />
      </Box> */}
    </ThemeProvider>
  );
};

const AppWithRedux: React.FC = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

export default AppWithRedux;
