import { signIn, useSession } from 'next-auth/react';
import { getStripeJs } from '../../services/stripe-js';
import { api } from '../../services/api';
import styles from './styles.module.scss'

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const session = useSession()
  
  async function handleSubscribe() {
    console.log(session)
    if (!session) {
      signIn('github')
      return
    }

    try { 
      const response = await api.post('/subscribe') 
      const { sessionId } = response.data

      const stripe = await getStripeJs()

      await stripe.redirectToCheckout(sessionId)
    } catch (err) {
      alert(err.message);
    }
  }
  
  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe Now
    </button>
  )
}