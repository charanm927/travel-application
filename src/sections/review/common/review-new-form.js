import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';

import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import FormHelperText from '@mui/material/FormHelperText';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { _reviews } from 'src/_mock';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function ReviewNewForm({ onClose, ...other }) {
  const [rating, setRating] = useState('');
  const [review, setReview] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  // const defaultValues = {
  //   rating: 0,
  //   review: '',
  //   name: '',
  //   email: '',
  // };

  const NewReviewSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    rating: Yup.number().min(1, 'Rating must be greater than or equal to 1'),
    review: Yup.string().required('Review is required'),
    email: Yup.string().required('Email is required').email('That is not an email'),
  });

  const methods = useForm({
    resolver: yupResolver(NewReviewSchema),
    // defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      reset();
      onClose();
      console.log('DATA', data);
    } catch (error) {
      console.error(error);
    }
  });

  const updateReviewState = (value) => {
    setReview(value);
  };

  const updateNameState = (value) => {
    setName(value);
  };

  const updateEmailState = (value) => {
    setEmail(value);
  };

  const addReview = (rating, review, name, email) => {
    const data = {
      id: _reviews.length,
      name: name,
      avatarUrl: '',
      message: review,
      createdAt: new Date().toISOString(),
      rating: rating,
      helpful: 0,
      users: [],
      replyComment: [],
    };
    _reviews.push(data);
  };

  return (
    <Dialog fullWidth maxWidth="sm" onClose={onClose} {...other}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <DialogTitle sx={{ typography: 'h3', pb: 3 }}>Review</DialogTitle>

        <DialogContent sx={{ py: 0 }}>
          <Stack spacing={2.5}>
            <div>
              <Typography variant="subtitle2" gutterBottom>
                Your rating:
              </Typography>

              <Controller
                name="rating"
                control={control}
                render={({ field }) => (
                  <Rating
                    {...field}
                    value={Number(field.value)}
                    onChange={(event, newValue) => {
                      field.onChange(newValue);
                      setRating(event.target.value);
                    }}
                  />
                )}
              />

              {!!errors.rating && <FormHelperText error> {errors.rating?.message}</FormHelperText>}
            </div>

            <RHFTextField
              multiline
              rows={3}
              name="review"
              label="Review *"
              onUpdate={updateReviewState}
            />

            <RHFTextField name="name" label="Name *" onUpdate={updateNameState} />

            <RHFTextField name="email" label="Email address *" onUpdate={updateEmailState} />
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button variant="outlined" onClick={onClose} color="inherit">
            Cancel
          </Button>

          <LoadingButton
            color="inherit"
            type="submit"
            variant="contained"
            loading={isSubmitting}
            onClick={() => addReview(rating, review, name, email)}
          >
            Post Review
          </LoadingButton>
        </DialogActions>
      </FormProvider>
    </Dialog>
  );
}

ReviewNewForm.propTypes = {
  onClose: PropTypes.func,
};
