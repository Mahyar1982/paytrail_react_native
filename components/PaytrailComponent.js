import React, { useState } from 'react';
import { Form } from '@paytrail/react-paytrail-e2';
import { Text, Button, View } from 'react-native'
import { WebView } from 'react-native-webview';
import { renderToString } from 'react-dom/server';

const PaytrailComponent = () => {
    const [debug, toggleDebug] = useState(false)
    const [isWebview, setIsWebView] = useState(true);
    const [paymentStatusText, setPaymentStatusText] = useState('');

    const onSuccessPayment = () => {
      setIsWebView(false);
      setPaymentStatusText('Payment is successful');
    }

    const onCancelPayment = () => {
      setIsWebView(false);
      setPaymentStatusText('Payment is failed');
    }

    const onPayAgain = () => {
      setIsWebView(true);
    }

    const onLoadStart = event => {
        const { nativeEvent } = event;
        if(nativeEvent.url.toString().includes(urls.success.toString()) ||
           nativeEvent.url.toString().includes('/success')) {
           onSuccessPayment();
           return
        }
        if(nativeEvent.url.toString().includes(urls.cancel.toString()) ||
           nativeEvent.url.toString().includes('/cancel')) {
            onCancelPayment();
        }
        if(nativeEvent.url.toString().includes('return/cancel')) {
            onCancelPayment();
        }
      }

    /**
     * Merchant should be fetched from your backend configuration.
     * The values below are for demo usage only.
     */
    const merchant = {
        id: '13466',
        secret: '6pKF4jkv97zmqBJ3ZL8gUw5DfT2NMQ',
    }

   /**
    * Order number should identify your transaction as uniquely as possible.
   */
  const orderNumber = `ORDER-${Math.floor(Math.random() * 9999)}`

  const customer = {
    firstName: 'Alice',
    lastName: 'Angel',
    email: 'alice@example.org',
    phone: '040123456',
    company: 'Acme Ltd',
    address: {
      street: 'Test Street 1',
      postalCode: '100200',
      town: 'Helsinki',
      country: 'FI',
    },
  }

   /**
   * @member success - URL where the customer is redirected after successful payment.
   * @member cancel - URL where customer is redirected after failed or cancelled payment.
   * @member notify - URL to be called when the payment has been marked as paid.
   */
    const urls = {
        success: new URL('http://example.com/success'),
        cancel: new URL('http://example.com/cancel'),
        notify: new URL('http://example.com/notify'),
    }

  /**
   * For each product, at least ID, title, and price should be specified.
   */
  const products = [
    {
      id: 1,
      title: 'Deluxe Couch',
      price: 499.899,
      quantity: 1,
      discount: 10,
      type: 1,
    },
    {
      id: 2,
      title: 'Shipping fees',
      price: 10.0,
      quantity: 1,
      discount: 0,
      type: 2,
    },
  ]

  const PaytrialForm = () => {
    return (
      <Form
          className='e2-demo'
          debug={debug}
          merchant={merchant}
          orderNumber={orderNumber}
          urls={urls}
          customer={customer}
          products={products}
          currency='EUR'
          locale='fi_FI'
          reference='RF111232'
          paymentMethods={[1, 2]}
          includeVat
          expiresAt='2099-01-01T12:00:00+00:00'
          algorithm='sha256'
          messages={{
              merchantPanel: "This is a message for the Merchant's Panel",
              payer: 'This is a message for the customer',
              paymentMethod: 'This is a message for the payment method',
          }}
      />
    )
  }
   return (
       <>
        {
            isWebview ?
              <WebView
                originWhitelist={['*']}
                onLoadStart={onLoadStart}
                source={{ html: renderToString(
                  <PaytrialForm />
                    )
                }}
                />
              :
              <View>
                <Text>
                  {paymentStatusText}
                </Text>
                <Button
                  title="Pay again"
                  onPress={onPayAgain}
                  />
              </View>
            }
       </>
   );
};

export default PaytrailComponent;
