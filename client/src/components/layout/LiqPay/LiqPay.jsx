import CryptoJS from 'crypto-js';
import axios from 'axios';
import { Base64 } from 'js-base64';

const LiqPay = ({
  public_key,
  private_key,
  amount,
  currency,
  description,
  order_id,
  server_url
}) => {
  const generateData = () => {
    const jsonData = {
      public_key,
      version: '3',
      action: 'pay',
      amount,
      currency,
      description,
      order_id,
      server_url: server_url,
      sandbox: '1' // Удалите это поле для работы в реальном режиме
    };
    const data = Base64.encode(JSON.stringify(jsonData));
    const signature = CryptoJS.SHA1(private_key + data + private_key).toString(
      CryptoJS.enc.Base64
    );
    return { data, signature };
  };

  const { data, signature } = generateData();

  return (
    <form method='POST' action='https://www.liqpay.ua/api/3/checkout'>
      <input type='hidden' name='data' value={data} />
      <input type='hidden' name='signature' value={signature} />
      <button type='submit'>Оплатить</button>
    </form>
  );
};

export default LiqPay;
