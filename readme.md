# **Project 4: MBE Mail Recorder** ![ga_cog_large_red_rgb](https://cloud.githubusercontent.com/assets/40461/8183776/469f976e-1432-11e5-8199-6ac91363302b.png)
## Browser-based business software




## Overview

This is my fourth and last project from General Assembly's Software Engineering Immersive Course. It is an individual project built in one week.
MBE Mail Recorder is an idea that comes from my previous work experience at Mail Boxes Etc. franchise where the core businesses is postal boxes rental.
It is a Browser-based office application: from the frontend the customer can register and rent mailboxes to receive mail at the shop address, from the backend the shop owner can keep track of every customer’s mail at all times. The customers personal profile section can be used to  update their personal details, access their rental details and check for possible mail received, collected or not.

[Deployed project]  (https://project4-mailboxes.herokuapp.com/#/profile)



![First GIF](/frontend/src/img/readme-screenshots/mail_recorder.gif)

———————————————————————


## Brief
* Building the Python Models and serializers
* Making the database structure
* Making the front end components with React and SCSS
* Connecting front and back end
* Deploy your game online, using Heroku


———————————————————————

## Technologies Used

* Django
* SQL
* Python
* JavaScript (ES6)
* Git
* GitHub



———————————————————————


## Approach Taken

I’ve started setting the Django project, then I carefully worked on the structure of the database and the relations between the models.
After testing the database with Insomnia, I made a basic React frontend and I connected it with the Django backend.
When the MVP was achieved I started refining the functionality both from the backend and from the frontend.
Finally I Styled the frontend part of the application using SCSS.





## Functionality

Models (Python)


```python

from django.db import models
from django.contrib.auth.models import User



class StorageArea(models.Model):
    name = models.CharField(max_length=30)
    def __str__(self):
        return f'{self.name}'

class MailBox(models.Model):
    number = models.IntegerField()
    customer = models.ForeignKey(User, related_name='mailboxes', on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f'{self.number}'

class RentalAgreement(models.Model):
    customer = models.ForeignKey(User, related_name='rental_agreements', on_delete=models.PROTECT)
    mailbox = models.ForeignKey(MailBox, related_name='rental_agreements', on_delete=models.PROTECT) # i need number
    startdate = models.DateField(auto_now=False, auto_now_add=False)
    rentalperiod = models.CharField(max_length=30)
    confirmed = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.customer} - mailbox number:{self.mailbox} (start:{self.startdate} rental period:{self.rentalperiod}) - confirmed:{self.confirmed}'

class Mail(models.Model):
    customer = models.ForeignKey(User, related_name='mail', on_delete=models.PROTECT)
    mailbox = models.ForeignKey(MailBox, related_name='mail', on_delete=models.PROTECT) # i need number
    receivingtime = models.DateTimeField(auto_now=False, auto_now_add=False)
    trackingnumber = models.CharField(max_length=500)
    color = models.CharField(max_length=30)
    description = models.TextField()
    storagearea = models.ForeignKey(StorageArea, related_name='mail', on_delete=models.PROTECT)
    collected = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.customer} (mailbox number {self.mailbox}) - description:{self.description}'
```


-New agreement (JavaScript)


```javascript
const rentalPeriodOptions = [
  { value: '3 months', label: '3 months' },
  { value: '6 months', label: '6 months' },
  { value: 'one year', label: 'one year' },
  { value: 'for ever', label: 'for ever' }
]

constructor() {
    super()
    this.state = {
      formData: {
      },
      errors: {}
    }

    this.handleChangeNormal = this.handleChangeNormal.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChangeNormal(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    const errors = { ...this.state.errors, [e.target.name]: '' }
    this.setState({ formData, errors })
  }

  handleChange(selectedOption, name) {
    console.log(selectedOption)
    console.log(this.state.formData)
    const formData = { ...this.state.formData, [name]: selectedOption.value }
    const errors = { ...this.state.errors, [name]: '' }
    this.setState({ formData, errors })
  }


  handleSubmit(e) {
    e.preventDefault()
    axios.post('/api/rental_agreements/', this.state.formData, {
      headers: { Authorization: `Bearer ${Auth.getToken()}`}
    })
      .then(() => this.props.history.push('/profile'))
      .catch(err => this.setState({ errors: err.response.data }))
  }

  componentDidMount() {
    axios.get('/api/mailboxes/')
      .then(res => this.setState({ mailboxes: res.data.map(mb => ({ label: `Mailbox n.${mb.number}`, value: mb.id })) }))
  }

```




-Contact form which send the message to the owner email address

Python Model (Python)

```python

class Mail(models.Model):
    customer = models.ForeignKey(User, related_name='mail', on_delete=models.PROTECT)
    mailbox = models.ForeignKey(MailBox, related_name='mail', on_delete=models.PROTECT) # i need number
    receivingtime = models.DateTimeField(auto_now=False, auto_now_add=False)
    trackingnumber = models.CharField(max_length=500)
    color = models.CharField(max_length=30)
    description = models.TextField()
    storagearea = models.ForeignKey(StorageArea, related_name='mail', on_delete=models.PROTECT)
    collected = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.customer} (mailbox number {self.mailbox}) - description:{self.description}'

Message View

class MessageView(APIView):

    def post(self, request):
        name = request.data.get('name')
        message = request.data.get('message')
        email_from = request.data.get('email')
        recipient_list = [settings.EMAIL_HOST_USER,]
        send_mail(name, message, email_from, recipient_list)
        return Response({'message': 'Message sent!'})
```

Contact form frontend (JavaScript)

```javascript
constructor() {
    super()
    this.state = {
      formData: {
        name: '',
        email: '',
        message: ''
      },
      errors: {}
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(e) {
    e.preventDefault()

    axios.post('/api/message/', this.state.formData)
      .then(() => {
        toast.success('Thanks for contacting us, your message has been sent')
        this.setState({ formData: { name: '', email: '', message: '' } })
      })
      .catch(err => this.setState({ errors: err.response.data.errors }))
  }

  handleChange(e) {
    const formData = { ...this.state.formData, [e.target.name]: e.target.value }
    this.setState({ formData })
  }
```




———————————————————————




## Screenshots
MBE Mail Recorder
![Home](/frontend/src/img/readme-screenshots/MBE_Mail_Rec_Home.png)
![Contact](/frontend/src/img/readme-screenshots/MBE_Mail_Rec_Contact.png)
![New agreement](/frontend/src/img/readme-screenshots/MBE_Mail_Rec_NewAgr.png)
![Edit profile](/frontend/src/img/readme-screenshots/MBE_Mail_Rec_Edit.png)
![Customer profile](/frontend/src/img/readme-screenshots/MBE_Mail_Rec_Cust_Prof.png)





———————————————————————


## Bugs
* I realised that there was a bug when at the end of the project I noticed that setting the model of the Mailbox rental period agreement using time frame as fields, the customer was required to enter to precise info to register. I solved this problem by changing the nature of the field just as a normal CharField.


———————————————————————



## Wins, Blockers and key learnings

I am particularly proud of this application for two reasons: It was interesting to see how Python, Django, SQL, React & JavaScript worked with each other; moreover, instead of making an ordinary website, I came up with an office application where the frontend helps the customers and the backend makes work  for the retailer by organising and tracking the customers mail.
The most difficult blocker was setting the whole structure of the the SQL database with Django.
I am also particularly proud about the dynamic function which allows the customer who wants to rent a Mailbox to chose between the Mailbox numbers which are actually stored in the Database.



———————————————————————



## Future content

* Make the connection between Customer and Mailbox Number automatic on the database.
* Automate the email service for the customer.
* More interesting layout.
