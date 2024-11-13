import { Link, Outlet } from '@tanstack/react-router'
import { DotBackground, SpotlightBackground } from '@/components/Backgrounds'
import { motion } from 'motion/react'

class Metadata {}

export const metadata: Metadata = {
  title: 'Authentication',
  description: 'Authentication forms built using the components.'
}

export const AuthLayout = () => {
  return (
    <>
      <SpotlightBackground />
      <main>
        <div className="mx-auto flex h-screen flex-col justify-center w-full max-w-lg gap-6">
          <div className="flex flex-row">
            <div className="flex flex-col mx-auto items-center z-[1500]">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease: 'easeOut',
                  delay: 0.1
                }}
              >
                <div className="flex flex-col rounded bg-gradient-to-b from-background/20 to-background/80 backdrop-blur-xs border border-muted/80 justify-center shadow shadow-3xl p-6 gap-6">
                  <span className="flex flex-col flex-grow items-center align-center text-center mx-auto animate-fadeIn opacity-0 w-full h-[1px] absolute top-0 rounded bg-gradient-to-r border-muted/40 via-[#A9CEC0]/30 to-border-muted/40"></span>
                  <div className="flex flex-col">
                    <Outlet />
                  </div>
                  <div className="px-6 mt-4 text-center text-sm text-muted-foreground">
                    By continuing, you agree to our{' '}
                    <Link to="https://example.com/legal/terms-of-service" className="underline underline-offset-4 hover:text-accent-foreground">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link to="https://example.com/legal/privacy-policy" className="underline underline-offset-4 hover:text-accent-foreground">
                      Privacy Policy
                    </Link>
                    .
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
        <DotBackground />
      </main>
    </>
  )
}
