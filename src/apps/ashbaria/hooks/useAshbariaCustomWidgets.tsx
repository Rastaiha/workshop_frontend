import React from "react";
import { ComplementaryObjectType } from "commons/types/models";
import DocumentsButton from "../components/molecules/buttons/Documents";
import HintsButton from "../components/molecules/buttons/Hints";
import FinishCourt from "../components/organisms/game-elements/FinishCourt";
import MyLastSupportInFSM from "../components/molecules/chips/MyLastSupportInFSM";
import MyLastScoreInFSM from "../components/molecules/chips/MyLastScoreInFSM";
import MyLastSupportChangeInFSM from "../components/molecules/chips/MyLastSupportChangeInFSM";
import MyTotalScore from "../components/molecules/chips/MyTotalScore";
import MyProfile from "../components/molecules/chips/MyProfile";

const useAshbariaCustomWidgets = () => {

  const complementaryObjects: ComplementaryObjectType[] = [
    {
      name: 'ashbaria-finish-court',
      substituteComponent: <FinishCourt />
    },
    {
      name: 'ashbaria-documents-button',
      substituteComponent: <DocumentsButton />
    },
    {
      name: 'ashbaria-hints-button',
      substituteComponent: <HintsButton />
    },
    {
      name: 'ashbaria-last-support-percentage-change-in-fsm',
      substituteComponent: <MyLastSupportChangeInFSM />
    },
    {
      name: 'ashbaria-last-support-percentage-in-fsm',
      substituteComponent: <MyLastSupportInFSM />
    },
    {
      name: 'ashbaria-last-score-in-fsm',
      substituteComponent: <MyLastScoreInFSM />
    },
    {
      name: 'ashbaria-total-score',
      substituteComponent: <MyTotalScore />
    },
    {
      name: 'ashbaria-my-profile',
      substituteComponent: <MyProfile />,
    }
  ];

  return {
    complementaryObjects,
  }
}

export default useAshbariaCustomWidgets;