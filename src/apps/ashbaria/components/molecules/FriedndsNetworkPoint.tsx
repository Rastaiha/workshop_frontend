import { Box, Typography } from "@mui/material";
import React from "react";
import VerifyIcon from "../atoms/icons/Verify";
import TwoPeopleIcon from "../atoms/icons/TwoPeople";

interface FriedndsNetworkPointProps{
	points: number, 
	numberOfFriends: number
}

const FriendsNetworkPoints: React.FC<FriedndsNetworkPointProps> = ({points, numberOfFriends}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				alignItems: 'center',
				justifyContent: "space-around",
				flexDirection: "row",
				height: 36,
				minWidth: 120,
				borderRadius: 20,
				backgroundColor: "#0000004D",
				border: 0,
			}}
		>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					fontSize={16}
					fontWeight={800}
					sx={{
						textAlign: "right"
					}}
				>
					{points}
				</Typography>
				<VerifyIcon />
			</Box>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					alignItems: "center",
					justifyContent: "center",
				}}
			>
				<Typography
					fontSize={16}
					fontWeight={800}
					sx={{
						textAlign: "right"
					}}
				>
					{numberOfFriends}
				</Typography>
				<TwoPeopleIcon />
			</Box>
		</Box>
	);
}

export default FriendsNetworkPoints;