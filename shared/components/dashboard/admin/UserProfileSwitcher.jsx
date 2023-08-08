import {Row, Col, Form} from 'react-bootstrap';
import {Autocomplete} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersList, getCurrentUser} from '@/shared/redux/slices/user';
import {fetchTransactions} from '@/shared/redux/slices/transaction';

const UserProfileSwitcher = () => {
  const currentUser = useSelector(getCurrentUser);
  const allUsers = useSelector(getUsersList);
  const dispatch = useDispatch();

  return (
    currentUser?.role == 'admin' &&
    allUsers && (
      <Row style={{transform: 'translateY(-20%)'}}>
        <Col md={4}>
          <Autocomplete
            options={allUsers}
            getOptionLabel={(option) => option?.displayName || option?.username}
            onChange={async (e, value) => {
              const {userPaymentId} = value;
              await dispatch(
                fetchTransactions({userPaymentIdFromAdmin: userPaymentId})
              );
            }}
            defaultValue={allUsers[0]}
            renderInput={(params) => (
              <div ref={params.InputProps.ref}>
                <Form.Label {...params.InputLabelProps}>
                  {'Currently Viewing'}
                </Form.Label>
                <Form.Control type={'text'} {...params.inputProps} />
              </div>
            )}
          />
        </Col>
      </Row>
    )
  );
};
export default UserProfileSwitcher;
