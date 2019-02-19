const calendarCellMargin = "0.2em";
const minButtonHeight = "2em";

const defaultStyles = {
    calendarDay: {
        borderRadius: "0.5em",
        textAlign: "center"
    },
    outOfRangeDay: {
        cursor: "default",
        color: "#818181",
        backgroundColor: "#d3d3d3"
    },
    inRangeDay: {},
    previousMonthDay: {
        color: "#818181",
        backgroundColor: "#e3e3e3"
    },
    nextMonthDay: {
        color: "#818181",
        backgroundColor: "#e3e3e3"
    },
    currentMonthDay: {
        backgroundColor: "#a7c1b5",
        color: "#000000"
    },
    presentDay: {
        color: "#333333",
        backgroundColor: "#97b1a5"
    },
    selectedDay: {
        color: "#202721",
        backgroundColor: "#f7c1b5"
    },
    monthYearHeading: {
        textAlign: "center",
        fontSize: "125%",
        color: "#274135"
    },
    monthYearButton: {
        fontWeight: "bolder",
        fontSize: "110%"
    },
    timeDisplay: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: "140%",
        color: "#476155"
    },
    timeButton: {
        fontWeight: "bolder",
        fontSize: "110%"
    },
    weekDayName: {
        textAlign: "center",
        fontWeight: "bold",
        color: "#333333"
    },

    // The below styles are mostly structural and usually shouldnt
    // be overridden
    datePicker: {},
    dayNameHeadings: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gridGap: calendarCellMargin,
        gridAutoRows: "minmax(1em, auto)"
    },
    calendarDays: {
        display: "grid",
        gridTemplateColumns: "repeat(7, 1fr)",
        gridGap: calendarCellMargin,
        gridAutoRows: "minmax(1em, auto)",
        marginBottom: "0.5em",
        '& label': {
            paddingTop: "25%",
            paddingBottom: "25%",
            cursor: "pointer"
        }
    },
    monthSelect: {
        display: "grid",
        gridTemplateColumns: "1fr 4fr 1fr",
        marginBottom: "0.5em",
        "& button": {
            width: "100%",
            minHeight: minButtonHeight
        }
    },
    timePicker: {
        display: "grid",
        gridTemplateColumns: "1fr 4fr 1fr",
        marginBottom: "0.5em",
        '& button': {
            width: "100%",
            minHeight: minButtonHeight     
        }
    },
    srOnly: {
        position: "absolute",
        width: "1px",
        height: "1px",
        padding: "0",
        margin: "-1px",
        overflow: "hidden",
        clip: "rect(0,0,0,0)",
        border: "0"
    }
};

export default defaultStyles;