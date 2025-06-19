"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { ThemeProvider, createTheme, Theme } from "@mui/material/styles";

interface ThemeContextProps {
  theme: Theme;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

const baseTheme = createTheme();

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
}) => {
  const theme = createTheme({
    ...baseTheme,
    spacing: 1,
    breakpoints: {
      values: {
        xs: 0,
        sm: 320,
        md: 744,
        lg: 1024,
        xl: 1440,
      },
    },
    palette: {
      background: {
        default: "#F7F8FB",
      },
      primary: {
        main: "#4a715d",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: "#061D2D",
        contrastText: "#fff",
      },
    },
    components: {
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "#fff",
            boxShadow: "0px 1px 4px -1px #0000001A",
          },
        },
      },
      MuiContainer: {
        styleOverrides: {
          root: {
            paddingLeft: "24px !important",
            paddingRight: "24px !important",
          },
        },
      },
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
            color: "#0B1E34",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            color: "#2e3740" + "FF",
            fontWeight: 400,
            fontSize: 14,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
            textTransform: "none",
            borderRadius: 6,
            fontWeight: 600,
            boxShadow: "none !important",
            "&:hover": {
       backgroundColor:'#e5ab0f',
         color:'#4a715d', 
      },
      "&:active": {
        backgroundColor:'#e5ab0f',
         color:'#4a715d', 
      },
            "&:disabled": {
              backgroundColor: "#90EE90",
              color: "#90EE90",
            },
          },
          
        },
      
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: "#FFFFFF",
            color: "#000000",
            fontFamily: "Poppins",
            fontSize: "12px",
            fontWeight: 300,
            borderRadius: 6,
            padding: "8px 12px",
            transition: "background-color 0.2s ease-in-out",
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
          },
          arrow: {
            color: "#FFFFFF",
          },
        },
      },

      MuiButtonBase: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
            textTransform: "none",
            borderRadius: 6,
            fontWeight: 600,
            boxShadow: "none !important",
            "&:disabled": {
              backgroundColor: "#90EE90",
              color: "#90EE90",
            },
            "&.MuiChip-root": {
              backgroundColor: "#DEECFB",
              color: "#0C3CA3",
              height: "36px",
              fontFamily: "Poppins",
              fontWeight: "600 !important",
              fontSize: "14",
            },
          },
        },
      },

      MuiTextField: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            "& .MuiInputBase-root": {
              backgroundColor: "#4a715d80;",
              borderRadius: 6,
              fontFamily: "Poppins",
              color:'#14231c',
              opacity: 1,
            },
            "& .MuiInputBase-input::placeholder": {
              color: "#4a715d",
              opacity: 0.9,
            },
            "& .MuiOutlinedInput-root": {
              "& fieldset": {
                borderColor: "#4a715d", // this is the original border color
                transition: "all 0.2s ease-in-out",
              },
              "&:hover fieldset": {
                borderColor: "#14231c", // use the original border color on hover
                transition: "all 0.2s ease-in-out",
              },
              "&.Mui-focused fieldset": {
                border: "1px solid #14231c",
              },
            },
          },
        },
      },

      MuiFormHelperText: {
        styleOverrides: {
          root: {
            paddingRight: 6,
            margin: 0,
            textAlign: "right",
            borderBottomRightRadius: 6,
            borderBottomLeftRadius: 6,
            backgroundColor: "#828282",
            borderTop: "0px !important",
            "&.Mui-focused": {
              border: "0px !important",
            },
          },
        },
      },

      MuiAutocomplete: {
        styleOverrides: {
          paper: {
            fontSize: "14px",
            fontWeight: 400,
          },
          listbox: {
            padding: 0,
            fontFamily: "Poppins",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
            fontWeight: 600,
            padding: "7px 8px",
            borderRadius: 6,
          },
        },
      },

      MuiTablePagination: {
        styleOverrides: {
          root: {
            "& .MuiTablePagination-selectLabel": {
              fontFamily: "Poppins",
            },
            "& .MuiTablePagination-displayedRows": {
              fontFamily: "Poppins",
            },
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 0,
            height: "24px",
            width: "36px",
            "& .MuiSwitch-switchBase": {
              width: "36px",
              height: "24px",
              position: "absolute",
              top: "auto",
              left: "6px",
              "& .Mui-checked": {
                transform: "translateX(8px)",
              },
            },
            "& .MuiSwitch-thumb": {
              backgroundColor: "#68DAA7",
              "&::before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              },
            },
            "& .Mui-checked": {
              transform: "translateX(10px) !important",
            },
            "& .MuiButtonBase-root": {
              width: "18px",
              height: "18px",
              top: "3px",
              left: "4px",
              padding: 0,
            },
          },
        },
      },
    },
  });

  return (
    <ThemeContext.Provider value={{ theme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeProviderWrapper"
    );
  }
  return context;
};

export default ThemeProviderWrapper;
