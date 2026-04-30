type ErrorsType = string[] | Record<string, string>

interface Props {
  errors: ErrorsType
  title?: string
}
