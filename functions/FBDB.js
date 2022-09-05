import {
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDoc,
	getDocs,
	limit,
	onSnapshot,
	orderBy,
	query,
	setDoc,
	startAfter,
	where,
} from "firebase/firestore";
import {auth, db} from "../config/firebase";

export const addUserToFB = async (info, id) => {
	await setDoc(doc(db, "Users", id), info);
};

export const addTodoToFB = async (info, id) => {
	if (id) {
		await setDoc(doc(db, "Todos", id), info);
	} else {
		await addDoc(collection(db, "Todos"), info);
	}
};
export const updateTodoToFB = async (info, id,status) => {
	info.status = status;
		await setDoc(doc(db, "Todos", id), info);
};
export const deleteTodoFromFB = async ( id) => {
		await deleteDoc(doc(db, "Todos", id));
};

export const getSingleUserInfo = () => {
	const userRef = collection(db, "Users");
	const q = query(userRef, where("uid", "==", auth?.currentUser?.uid));
	onSnapshot(q, (querySnapshot) => {
		let mydata = {};
		querySnapshot.forEach((doc) => {
			mydata = doc.data();
		});
		return mydata;
	});
};

export const getCurrentUser = async () => {
	const userRef = doc(db, "Users", auth?.currentUser?.uid);
	const userSnap = await getDoc(userRef);
	let user;
	if (userSnap.exists()) {
		user = userSnap.data();
	} else {
		const artistRef = doc(db, "Users", auth?.currentUser?.uid);
		const artistSnap = await getDoc(artistRef);
		if (artistSnap.exists()) {
			user = artistSnap.data();
		} else {
			user = null;
		}
	}
	user && (user.id = auth?.currentUser?.uid);
	return user;
};

export const getAllTodos = async (id, searchText) => {
	return new Promise(async (resolve, reject) => {
		const first = query(
			collection(db, "Todos"),
			where("user", "==", id),
			where("status", "==", 'todo'),
			orderBy("added_at"),
			limit(25)
		);
		const documentSnapshots = await getDocs(first);
		let todos = [];
		documentSnapshots.forEach((doc) => {
			let todo = {...doc.data(), id: doc.id};
			if (searchText) {
				let res = JSON.stringify(todo)
					.toLowerCase()
					.search(searchText.toLowerCase());
				if (res >= 0) {
					todos.push(todo);
				}
			} else {
				todos.push(todo);
			}
		});
		const lastVisible =
			documentSnapshots.docs[documentSnapshots.docs.length - 1];
		const next = query(
			collection(db, "Todo"),
			where("user", "==", id),
			where("status", "==", 'todo'),
			orderBy("added_at"),
			limit(25)
		);
		resolve({todos, next});
	});
};
export const getAllCompletedTodos = async (id, searchText) => {
	return new Promise(async (resolve, reject) => {
		const first = query(
			collection(db, "Todos"),
			where("user", "==", id),
			where("status", "==", 'completed'),
			orderBy("added_at"),
			limit(25)
		);
		const documentSnapshots = await getDocs(first);
		let todos = [];
		documentSnapshots.forEach((doc) => {
			let todo = {...doc.data(), id: doc.id};
						todos.push(todo);
		});
		const lastVisible =
			documentSnapshots.docs[documentSnapshots.docs.length - 1];
		const next = query(
			collection(db, "Todo"),
			where("user", "==", id),
			where("status", "==", 'completed'),
			orderBy("added_at"),
			limit(25)
		);
		resolve({todos, next});
	});
};

