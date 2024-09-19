import {
  Button,
  Stack,
  Typography,
} from '@mui/material';
import React, { FC, Fragment } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ProgramContactInfo from 'commons/components/molecules/ProgramContactInfo';
import { useGetProgramQuery } from 'apps/website-display/redux/features/program/ProgramSlice';

type DashboardSidebarPropsType = {
  buttons?: any[];
}

const DashboardSidebar: FC<DashboardSidebarPropsType> = ({
  buttons = [],
}) => {
  const navigate = useNavigate();
  const { programSlug } = useParams();
  const { data: program } = useGetProgramQuery({ programSlug });

  if (!program) return null;

  return (
    <Stack justifyContent={'space-between'} spacing={2} width={220}>
      <Stack spacing={1} sx={{ userSelect: 'none' }} alignItems={'center'}>
        <img src={program.cover_page} alt='program-cover-page' width={200} style={{ borderRadius: 8 }} />
      </Stack>
      <ProgramContactInfo programContactInfo={program.program_contact_info} />
      <Stack spacing={2} justifyContent={'space-between'}>
        {program.participation_type === 'Team' &&
          <Button
            size='large'
            variant="contained"
            color='info'
            fullWidth
            onClick={() => navigate(`/program/${programSlug}/team-setting/`)}>
            {'تیم‌بندی'}
          </Button>
        }
        {buttons.map((button, index) => <Fragment key={index}>{button}</Fragment>)}
      </Stack>
    </Stack>
  );
}

export default DashboardSidebar;
