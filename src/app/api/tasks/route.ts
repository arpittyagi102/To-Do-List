import { getDatabase } from "@/app/utils/mongodb";
import { ObjectId } from "mongodb";


export async function GET(request: Request) {
  console.log("GET request received");
  
  try {
      const tasksCollection = await getDatabase("tasks");
      const allTasks = await tasksCollection.find().toArray();

      return Response.json(allTasks, { status: 200 });
  } catch (error) {
      console.log("Error while getting tasks", error)
      return Response.json({ message:"Error while getting tasks", error: error }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const body = await request.json();

  try {
      const userCollection = await getDatabase("tasks");
      await userCollection.insertOne(body);

      return Response.json({ message: 'userData is added' }, { status: 200 });
  } catch (error) {
      return Response.json({ message:"Error while adding userData", error: error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  const { _id } = await request.json();

  try {
      const userCollection = await getDatabase("tasks");
      const response = await userCollection.deleteOne({ _id: new ObjectId(_id)});
      console.log(response);
      return Response.json({ message: 'userData is deleted' }, { status: 200 });
  } catch (error) {
      return Response.json({ message:"Error while deleting userData", error: error }, { status: 500 });
  }
}