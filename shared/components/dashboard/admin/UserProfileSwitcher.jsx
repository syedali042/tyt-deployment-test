import {Row, Col, Form} from 'react-bootstrap';
import {Autocomplete} from '@mui/material';
import {useDispatch, useSelector} from 'react-redux';
import {getUsersList, getCurrentUser} from '@/shared/redux/slices/user';
import {
  fetchTransactions,
  getViewUser,
  getIsTransactionsRequestLoading,
} from '@/shared/redux/slices/transaction';

const UserProfileSwitcher = () => {
  const currentUser = useSelector(getCurrentUser);
  const allUsers = useSelector(getUsersList);
  const viewUser = useSelector(getViewUser);
  const isTransactionsRequestLoading = useSelector(
    getIsTransactionsRequestLoading
  );
  const dispatch = useDispatch();

  return (
    currentUser?.role == 'admin' &&
    allUsers && (
      <Row style={{transform: 'translateY(-20%)'}}>
        <Col md={4}>
          <Autocomplete
            options={allUsers}
            getOptionLabel={(option) =>
              option?.displayName || option?.username || option?.email
            }
            disabled={isTransactionsRequestLoading}
            onChange={async (e, value) => {
              await dispatch(fetchTransactions({user: value}));
            }}
            value={viewUser || null}
            defaultValue={null}
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
