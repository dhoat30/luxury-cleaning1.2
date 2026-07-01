import { createTheme } from '@mui/material/styles';
//export theme settings
// mui theme settings 

const getButtonBaseStyles = (loadingColor) => ({
    borderRadius: 0,
    textTransform: "none",
    fontWeight: 500,
    letterSpacing: "0.02rem",
    boxShadow: "none",
    transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
    "&:hover": {
        boxShadow: "0 12px 28px rgba(160, 116, 31, 0.24)",
        transform: "translateY(-1px)",
    },
    "&.Mui-disabled": {
        opacity: 0.58,
    },
    "& .MuiLoadingButton-loadingIndicator": {
        color: loadingColor,
    },
});

const createButtonTheme = ({ containedBackground, containedColor, containedHoverBackground, outlinedColor, outlinedHoverBackground }) => ({
    defaultProps: {
        disableElevation: true,
    },
    styleOverrides: {
        root: getButtonBaseStyles(containedColor),
        sizeSmall: {
            minHeight: "34px",
            padding: "8px 16px",
            fontSize: "0.82rem",
        },
        sizeMedium: {
            minHeight: "42px",
            padding: "11px 22px",
            fontSize: "0.88rem",
        },
        sizeLarge: {
            minHeight: "48px",
            padding: "13px 28px",
            fontSize: "0.92rem",
        },
        containedPrimary: {
            background: containedBackground,
            color: containedColor,
            border: "1px solid rgba(216, 182, 106, 0.28)",
            boxShadow: "0 12px 30px rgba(20, 16, 11, 0.18)",
            "&:hover": {
                background: containedHoverBackground,
                borderColor: "rgba(216, 182, 106, 0.42)",
                boxShadow: "0 16px 36px rgba(20, 16, 11, 0.22)",
            },
            "&.Mui-disabled": {
                background: containedBackground,
                color: containedColor,
            },
        },
        outlinedPrimary: {
            borderColor: "rgba(216, 182, 106, 0.42)",
            color: outlinedColor,
            "&:hover": {
                borderColor: "rgba(216, 182, 106, 0.68)",
                background: outlinedHoverBackground,
                color: outlinedColor,
            },
        },
    },
});

const darkSurfaceButtonTheme = createButtonTheme({
    containedBackground: "#fffaf0",
    containedColor: "#17120a",
    containedHoverBackground: "#f4eadb",
    outlinedColor: "#fffaf0",
    outlinedHoverBackground: "rgba(255, 250, 240, 0.08)",
});

const lightSurfaceButtonTheme = createButtonTheme({
    containedBackground: "#17120a",
    containedColor: "#fffaf0",
    containedHoverBackground: "#2a2118",
    outlinedColor: "#17120a",
    outlinedHoverBackground: "rgba(23, 18, 10, 0.06)",
});

export const darkSurfaceTheme = createTheme({

    palette: {
        mode: 'dark',
        primary: {
            main: '#fffaf0',
            contrastText: '#17120a',

        },

        contrastThreshold: 4.5,
    },
    typography: {
        fontFamily: [
            'var(--font-work-sans)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontWeight: 600,
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-gilda-display)',
            lineHeight: 1.1, 
            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 600,
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-gilda-display)',

            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            fontWeight: 600,
            letterSpacing: "0.05rem",
            color: "var(--dark-on-surface)",
            fontFamily: 'var(--font-gilda-display)',

        },
        h4: {
            fontWeight: 500,
            color: "var(--dark-on-surface)",

            '@media (max-width:900px)': {
                fontSize: '1.5rem',
            },
        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",

            color: "var(--dark-on-surface)",

        },

        h6: {
            fontWeight: 400,
            color: "var(--dark-on-surface)",

        },
        body1: {
            fontWeight: 350,
            letterSpacing: "0.02rem",
            color: "var( --dark-on-surface-variant)"
        },
        body2: {
            fontWeight: 300,
            letterSpacing: "0.05rem",
        },
        subtitle1: {
            color: "var(--dark-on-surface)",

        }

    },
    components: {
        MuiButton: darkSurfaceButtonTheme,
        MuiLoadingButton: darkSurfaceButtonTheme,
    }
});

export const lightSurfaceTheme = createTheme({

    palette: {
        mode: 'light',
        primary: {
            main: '#17120a',
            contrastText: '#fffaf0',

        },


    },
    typography: {
        fontFamily: [
            'var(--font-work-sans)',
            "Segoe UI",
            'sans-serif',
        ].join(','),
        h1: {
            fontSize: '5rem',
            fontWeight: 600,
            color: "var(--light-on-surface)",
            fontFamily: 'var(--font-gilda-display)',
            lineHeight: 1.1, 
            '@media (max-width:900px)': {
                fontSize: '3rem',
            },
        },
        h2: {
            fontWeight: 600,
            color: "var(--light-on-surface)",
            fontFamily: 'var(--font-gilda-display)',

            '@media (max-width:600px)': {
                fontSize: '2.5rem',
            },
        },
        h3: {
            fontWeight: 600,
            letterSpacing: "0.05rem",
            color: "var(--light-on-surface)",
            fontFamily: 'var(--font-gilda-display)',

        },
        h4: {
            fontWeight: 500,
            color: "var(--light-on-surface)",
            fontFamily: 'var(--font-gilda-display)',


        },
        h5: {
            fontWeight: 400,
            letterSpacing: "0.02rem",
            color: "var(--light-on-surface)",

        },

        h6: {
            color: "var(--light-on-surface)",
        },
        body1: {
            fontWeight: 300,
            color: "var( --light-on-surface-variant)"
        },
        body2: {
            fontWeight: 300,
            letterSpacing: "0.05rem",
        },
        subtitle1: {
            color: "var(--light-on-surface)",

        }

    },
    components: {
        MuiButton: lightSurfaceButtonTheme,
        MuiLoadingButton: lightSurfaceButtonTheme,
    }
});

export const theme = darkSurfaceTheme;
export const lightTheme = lightSurfaceTheme;
