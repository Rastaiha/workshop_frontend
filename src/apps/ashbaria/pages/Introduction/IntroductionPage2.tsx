import { Box, Button, Grid, IconButton, Stack, Typography } from "@mui/material";
import React, { FC, Fragment } from "react";
import { useSearchParams } from "react-router-dom";
import bg from "../../assets/introductionPage2.svg";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CustomDocumentPagination from "apps/ashbaria/components/molecules/CustomPagination";
import NextIntroductionPageButton from "apps/ashbaria/components/atoms/NextIntroductionPageButton";

type IntroductionPage2PropsType = {}

const IntroductionPage2: FC<IntroductionPage2PropsType> = ({ }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <Grid
      container
      sx={{
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundAttachment: "fixed",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Grid
        item
        xs={7}
        sx={{
          minHeight: "100%",
          background: "linear-gradient(180deg, rgba(72, 67, 105, 0.9) 0%, rgba(9, 5, 23, 0.891) 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexDirection: "column",
          padding: 2
        }}
      >
        <Stack>
          <Typography >
            {"اسم کامل کتابی که گفتم اینه:"}
          </Typography>
          <Typography color={"#FE9C42"}>
            {"ده راز آشباریا؛"}
            <br />
            {'ده اصل طلایی که به من آموخت چگونه مخ مردم را بار فرغون کنم'}
          </Typography>
          <Typography align='justify'>
            یه داستان بلند طنز که ماجرای سفر یه روزنامه‌نگار بخت برگشته رو به سرزمین ناشناختۀ آشباریا تعریف می‌کنه. جایی که آدما داخلش به جای روززنامه و تلویزیون و اینترنت و موبایل، با یه سری لوله اخبار و پیام‌ها رو رد و بدل می‌کنن و ظاهراً خوب هم میدونن چطوری به وسیلۀ اونا سر هم کلاه بذارن. شخصیت اصلی داستان توی این کتاب داره همین ها رو توضیح میده. روش‌هایی که توی آشباریا واسه شیره مالیدن سر مردم استفاده می‌شد. امیدوارم دونستن اونا به درد شما هم بخوره (البته در جهت مثبتش :)‌ )
          </Typography>
        </Stack>
        <Stack
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <IconButton
            sx={{
              backgroundColor: "#00000066",
              border: "1px solid #FE9C42",
              color: "#FE9C42",
            }}
            onClick={() => setSearchParams({page: "1"})}
          >
            <ArrowForwardIcon />
          </IconButton>
          <CustomDocumentPagination numberOfPages={3} currentPage={2} setCurrentPage={setSearchParams} />
          <NextIntroductionPageButton handleClick={() => { setSearchParams({ page: "3" }) }} />
        </Stack>
      </Grid>
    </Grid>
  );
};

export default IntroductionPage2;