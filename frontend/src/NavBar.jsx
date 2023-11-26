import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { styled } from "@mui/material/styles";


const StyledButton = styled(Button)({
    backgroundColor: "inherit",
    padding: "6px",
    color: "inherit",
    margin: "15px", //
    "&:hover": {
      backgroundColor: "inherit",
    },
  });

function Navbar() {
//   return (
//     <div>
//         <AppBar position="static" style={{ justifyContent: "center" }}>
//         <Toolbar>
//           <a href="/">
//             <Typography sx={{ fontFamily: "Oleo Script", fontSize: 32 }}>
//               cryptracc
//             </Typography>
//           </a>
//           <StyledButton variant="contained" href="/">
//             Dashboard
//             </StyledButton>
//             <StyledButton variant="contained" href="/analytics">
//             Analytics
//             </StyledButton>
//             <StyledButton variant="contained" href="/focusmode">
//             Focus Mode
//             </StyledButton>
//             <StyledButton variant="contained" href="/schedule">
//             Schedule Meeting
//             </StyledButton>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
}

export default Navbar;
