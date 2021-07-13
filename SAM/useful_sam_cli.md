### For local test

`sam local invoke MyLambda(Lambda's name) --event C:\event.json`

event.json </br>
`
{
  "body": "{\"operation\":\"get\",\"data\":{\"id\":\"12345678\"}}"
}
`



