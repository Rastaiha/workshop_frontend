import { Paper, Stack, Typography } from "@mui/material";
import React, { FC } from "react";
import ProgramLogo from "commons/components/atoms/logos/ProgramLogo";
import FullScreenBackgroundImage from "../../../commons/components/molecules/FullScreenBackgroundImage";
import BuyBookButton from "../components/molecules/buttons/BuyBook";
import { MediaUrls } from "../constants/mediaUrls";

export type ComingSoonPropsType = {};

const ComingSoon: FC<ComingSoonPropsType> = () => {

  return (
    <FullScreenBackgroundImage image={MediaUrls.WALL}>
      <Stack maxWidth={'sm'} component={Paper} padding={2} spacing={2} alignItems={'center'} justifyContent={'space-between'}>
        <ProgramLogo />
        <Typography textAlign={'center'}>
          ثبت‌نام‌اولیه‌ت انجام شد:)
          به‌زودی شروع ماجرای آشباریا رو بهت خبر می‌دیم.
          تا اون موقع، فرصت مطالعه کتاب رو از دست نده
        </Typography>
        <BuyBookButton />
      </Stack>
    </FullScreenBackgroundImage>
  );
};

export default ComingSoon;
