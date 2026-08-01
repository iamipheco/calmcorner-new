import PageHero from '../components/PageHero'

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="This page doesn't exist"
      description="The page you're looking for may have moved. Let's get you back on track."
      cta={{ label: 'Back to Home', to: '/' }}
      dividerFill="#FFFFFF"
    />
  )
}
