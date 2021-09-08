/* eslint-disable no-undef */
import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import { Button, Spin } from 'antd';
import './Purchase.css';

const Purchase = ({
  total,
  buyer,
}) => {
  const history = useHistory();
  const { address, firstName, lastName } = buyer;
  const [submitVisible, setSubmitVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const createTransaction = nonce => {
    if (!nonce) {
      setIsSubmitting(false);
      return;
    }
    setIsSubmitting(true);

    axios({
      method: 'post',
      url: '/checkout',
      data: {
        paymentMethodNonce: nonce,
        amount: total,
      }
    }).then(result => {
      const { data } = result;
      history.push('/paymentResult', {
        transaction: data.transaction,
      })
    }).catch(error => {
      history.push('/paymentResult', {
        error: error,
      })
    });
  }

  useEffect(() => {
    braintree.dropin.create({
      authorization: 'sandbox_jyjz5nfx_dzt5msgrphgvdpwv',
      selector: '#dropin-container',
      paypal: {
        flow: 'checkout',
        shippingAddressOverride: {
          ...address,
          recipientName: `${firstName} ${lastName}`,
        },
        amount: total,
        currency: 'USD',
      },
    }, (error, instance) => {
      document.getElementById('submit-button').addEventListener('click', () => {
        instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
          const { nonce } = payload;

          createTransaction(nonce);
        });
      });

      instance.on('changeActiveView', activeView => {
        console.log(activeView)
        const { newViewId, previousViewId } = activeView;
        if (newViewId === 'card') {
          setSubmitVisible(true);
        }
        if (newViewId === 'options' || newViewId === 'paypal') {
          setSubmitVisible(false);
        }

        if (newViewId === 'methods') {
          setSubmitVisible(false);
        }

        if (newViewId === 'methods' && previousViewId === 'paypal') {
          instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
            const { nonce } = payload;
  
            createTransaction(nonce);
          });
        }
      });
    });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [total, buyer]);

  return (
    <div className='purchase'>
      <Spin className='spin' tip='Submitting' spinning={isSubmitting} />
      <div className='total'>${total}</div>
      <div id='dropin-container' />
      <Button style={{ display: submitVisible ? 'block' : 'none' }} id='submit-button' type='primary' block>
        Submit
      </Button>
    </div>
  )
}

export default Purchase;
