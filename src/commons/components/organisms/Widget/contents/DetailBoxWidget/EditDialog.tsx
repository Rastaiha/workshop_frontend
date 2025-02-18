import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  MobileStepper,
  useTheme,
  DialogTitle,
} from '@mui/material';
import React, { Fragment, useState } from 'react';
import TinyEditorComponent from 'commons/components/organisms/TinyEditor/TinyEditorComponent';
import { PaperEditor } from 'commons/template/Paper';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import EditObjectFields from 'commons/components/organisms/forms/EditObject';
import { ContentWidgetType } from 'commons/types/widgets/ContentWidget';
import CollapsibleTitle from 'commons/components/molecules/CollapsibleTitle';

const DetailBoxEditDialog = ({
  paperId,
  id: widgetId,
  title: previousTitle,
  details,
  onMutate,

  open,
  handleClose,
  ...widgetProps
}) => {
  const theme = useTheme();
  const [title, setTitle] = useState(previousTitle);
  const [activeStep, setActiveStep] = useState(0);
  const [detailsId, setDetailsId] = useState<string>(details?.id);
  const [widgetFields, setWidgetFields] = useState<Partial<ContentWidgetType>>({ ...widgetProps });

  const handleNext = () => {
    if (activeStep === 0) {
      onMutate({
        paperId,
        widgetId,
        title,
        onSuccess: (result) => {
          const widget = result.data;
          setDetailsId(widget.details.id);
          setActiveStep((prevActiveStep) => prevActiveStep + 1);
        },
        ...widgetFields,
      });
    }
    if (activeStep === 1) {
      handleClose();
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Dialog
      maxWidth='md'
      disableScrollLock
      open={open}
      disableAutoFocus
      disableEnforceFocus>
      <DialogTitle>
        {activeStep === 0 && 'عنوان نکته'}
        {activeStep === 1 && 'جزئیات بیشتر'}
      </DialogTitle>
      <DialogContent>
        {activeStep === 0 &&
          <Fragment>
            <CollapsibleTitle title='مشخصات شئ'>
              <EditObjectFields
                fields={widgetFields}
                setFields={setWidgetFields}
              />
            </CollapsibleTitle>
            <DialogContentText gutterBottom>متن مورد نظر خود را وارد کنید.</DialogContentText>
            <TinyEditorComponent
              content={title}
              onChange={(text) => setTitle(text)}
            />
          </Fragment>
        }
        {activeStep === 1 &&
          <Fragment>
            <DialogContentText gutterBottom>ویجت‌هایی را که می‌خواهید به‌صورت پنهان‌شده باشند، اینجا بگذارید.</DialogContentText>
            {detailsId && <PaperEditor paperId={detailsId} mode='contents' />}
          </Fragment>
        }
      </DialogContent>
      <DialogActions>
        <MobileStepper
          sx={{ width: '100%' }}
          variant="dots"
          steps={2}
          position="static"
          activeStep={activeStep}
          nextButton={
            <Button variant="contained" onClick={handleNext}>
              {activeStep === 0 ? 'بعدی' : 'تمام'}
              {activeStep === 0 && (
                theme.direction === 'rtl' ?
                  <KeyboardArrowLeft /> :
                  <KeyboardArrowRight />
              )}
            </Button>
          }
          backButton={
            activeStep === 0 ?
              <Button
                variant="outlined"
                color="primary"
                onClick={handleClose}>
                {'انصراف'}
              </Button> :
              <Button variant="outlined" onClick={handleBack}>
                {theme.direction === 'rtl' ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                {'قبلی'}
              </Button>
          }
        />
      </DialogActions>
    </Dialog>
  );
}

export default DetailBoxEditDialog;
