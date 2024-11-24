from rest_framework.generics import ListAPIView
from .models import Student
from .serializers import StudentSerializer

# Create your views here.
class StudentListAPIView(ListAPIView):
    queryset = Student.objects.all()
    serializer_class = StudentSerializer

