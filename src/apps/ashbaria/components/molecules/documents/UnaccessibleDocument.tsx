import React from "react";
import { Stack, Typography } from "@mui/material";
import LockIcon from "../../atoms/icons/Lock";


const UnaccessibleDocument = () => {
	return (
		<Stack
			height={160}
			alignItems={'center'}
			justifyContent={'center'}
			borderRadius={2}
			paddingY={1.5}
			paddingX={1}
			spacing={1}
			sx={{
				boxShadow: "0px 2px 6px 0px #0000001A",
				backgroundColor: "#00000066"
			}}
		>
			<LockIcon size={68} />
			<Typography color={'#60557E'} fontSize={16} fontWeight={400} textAlign={'center'}>
				{'مکالمات چپق‌فروشان'}
			</Typography>
		</Stack>
	)
}

export default UnaccessibleDocument;
