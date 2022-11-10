import { Box } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/app/root-reducer';
import { Form } from 'src/components/Form/Form';
import { Obj } from 'src/utils/checklObj';
import './modal.scss';
import { createModal } from '../reducer';

const ModalCS = () => {
  const modal = useSelector((state: RootState) => state.actions.modal);
  const { open, data } = modal;
  const dispatch = useDispatch();

  const handleClearModal = () => {
    dispatch(createModal(false));
  };
  return (
    <Box id="modal">
      {open && !Obj.isEmpty(data) ? (
        <Box>
          <Box className="overlay-modal" onClick={handleClearModal} />
          <Box className="modal-wrapper">
            <Form {...data} />
          </Box>
        </Box>
      ) : (
        ''
      )}
    </Box>
  );
};
export default ModalCS;
