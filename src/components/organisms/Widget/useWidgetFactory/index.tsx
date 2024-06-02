import { useDispatch } from 'react-redux';
import { WidgetModes } from 'components/organisms/Widget';
import WIDGET_TYPE_MAPPER from './WidgetTypeMapper';
import { useDeleteWidgetMutation } from 'redux/features/widget/WidgetSlice';
import { runConfetti } from 'components/molecules/confetti'
import { toast } from 'react-toastify';

type WidgetFactoryType = {
  widgetId?: number;
  paperId?: number;
  widgetType?: string;
  mode: WidgetModes;
  collectWidgetDataToolkit?: any;
  collectAnswerData?: any;
}

const useWidgetFactory = ({
  widgetId,
  paperId,
  widgetType,
  mode,
  collectWidgetDataToolkit,
  collectAnswerData,
}: WidgetFactoryType) => {
  const dispatcher = useDispatch();
  const [deleteWidget, result] = useDeleteWidgetMutation();
  let onDelete, onMutate, onAnswerChange, onQuery, onAnswerSubmit;

  if (!widgetType) {
    return null;
  }

  const {
    WidgetComponent,
    EditWidgetDialog,
    createAction,
    updateAction,
    submitAnswerAction,
  } = WIDGET_TYPE_MAPPER[widgetType];

  onMutate = paperId ?
    (widgetId ?
      (arg) => dispatcher(updateAction(arg)) :
      (arg) => dispatcher(createAction(arg))) :
    // todo: fix TOF. لزوماً نباید با ?. هندلش کرد و لزوماً نباید اینجا صداش زد. اینجا صرفاً باید پاسش داد
    (widgetId ?
      collectWidgetDataToolkit?.updateWidget :
      collectWidgetDataToolkit?.addWidget?.({ widgetType }));

  onAnswerChange = collectAnswerData;

  // todo refactor: this peace of code should be extracted as a seprate method
  onAnswerSubmit = (arg) => dispatcher(submitAnswerAction(arg)).then(({ payload: { response } }) => {
    const CORRECTNESS_TRESHOLD = 50;
    if (response) {
      if (response.correctness_percentage > CORRECTNESS_TRESHOLD) {
        runConfetti();
        toast.success('آفرین! پاسخ شما درست بود.')
      } else {
        toast.error('پاسخ شما اشتباه بود')
      }
    } else {
      toast.success('پاسخ شما با موفقیت ثبت شد.');
    }
  });

  onDelete = paperId ?
    (arg) => deleteWidget(arg) :
    collectWidgetDataToolkit?.removeWidget;

  return {
    onDelete,
    onMutate,
    onAnswerChange,
    onQuery,
    onAnswerSubmit,
    WidgetComponent,
    EditWidgetDialog,
  };
}

export default useWidgetFactory;