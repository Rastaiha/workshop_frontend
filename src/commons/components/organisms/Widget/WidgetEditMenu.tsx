import React, { Fragment, useState } from 'react';
import { IconButton, Stack, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import HelpIcon from '@mui/icons-material/Help';

import DeleteWidgetDialog from 'commons/components/organisms/dialogs/DeleteWidgetDialog';
import EditHintsDialog from 'commons/components/organisms/dialogs/EditHintsDialog';
import useWidgetFactory from './useWidgetFactory';
import CreateAttributeDialog from '../dialogs/CreateAttributeDialog';

const WidgetEditMenu = ({
  widget,
  paperId,
  fsmStateId,
}) => {
  const [openAddAttributeDialog, setAddAttributeDialogOpen] = useState(false);
  const [openDeleteWidgetDialog, setOpenDeleteWidgetDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openEditHintDialog, setEditHintDialog] = useState(false);
  const {
    onDelete,
    onMutate,
    EditWidgetDialog,
  } = useWidgetFactory({
    widgetId: widget.id.toString(),
    paperId,
    widgetType: widget.widget_type,
  });

  return (
    <Fragment>
      {/* <Tooltip title='ویژگی‌ها' arrow>
        <IconButton size='small' onClick={() => setAddAttributeDialogOpen(true)}>
          <PaidIcon />
        </IconButton>
      </Tooltip> */}
      <Tooltip title='راهنمایی‌ها' arrow>
        <IconButton size='small' onClick={() => { setEditHintDialog(true) }}>
          <HelpIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='ویرایش' arrow>
        <IconButton size='small' onClick={() => { setOpenEditDialog(true) }}>
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title='حذف' arrow>
        <IconButton size='small' onClick={() => { setOpenDeleteWidgetDialog(true) }}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <CreateAttributeDialog
        open={openAddAttributeDialog}
        handleClose={() => setAddAttributeDialogOpen(!openAddAttributeDialog)}
      />
      <EditWidgetDialog
        {...widget}
        fsmStateId={fsmStateId}
        paperId={paperId}
        open={openEditDialog}
        handleClose={() => setOpenEditDialog(false)}
        onMutate={onMutate}
      />
      <DeleteWidgetDialog
        widgetId={widget.id}
        open={openDeleteWidgetDialog}
        handleClose={() => setOpenDeleteWidgetDialog(false)}
        onDelete={onDelete}
      />
      <EditHintsDialog
        paperId={paperId}
        hints={widget.hints}
        referenceId={widget.id}
        open={openEditHintDialog}
        handleClose={() => setEditHintDialog(false)}
      />
    </Fragment>
  );
};

export default WidgetEditMenu;
