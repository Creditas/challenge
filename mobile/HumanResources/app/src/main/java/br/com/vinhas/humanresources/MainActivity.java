package br.com.vinhas.humanresources;

import android.content.Context;
import android.content.res.Configuration;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import com.google.gson.Gson;
import com.loopj.android.http.JsonHttpResponseHandler;
import com.squareup.picasso.Picasso;
import org.json.JSONObject;
import br.com.vinhas.humanresources.Helpers.RoundedTransformation;
import br.com.vinhas.humanresources.Models.PeopleModel;
import br.com.vinhas.humanresources.Providers.PeopleProvider;
import cz.msebera.android.httpclient.Header;

public class MainActivity extends AppCompatActivity {

    PeopleModel people;
    ListView listView;
    Context mContext;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        listView = (ListView)findViewById(R.id.listview);
        mContext = this;

        if (savedInstanceState ==null) {
            PeopleProvider provider = new PeopleProvider();
            provider.getPeople(new JsonHttpResponseHandler() {
                @Override
                public void onSuccess(int statusCode, Header[] headers, JSONObject response) {
                    super.onSuccess(statusCode, headers, response);
                    Gson gson = new Gson();
                    people = gson.fromJson(response.toString(), PeopleModel.class);
                    listView.setAdapter(new peopleAdapter());
                }

                @Override
                public void onFailure(int statusCode, Header[] headers, String responseString, Throwable throwable) {
                    super.onFailure(statusCode, headers, responseString, throwable);
                }
            });
        }
        else {
            people = (PeopleModel) savedInstanceState.getSerializable("peopleList");
            listView.setAdapter(new peopleAdapter());
        }
    }

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        outState.putSerializable("peopleList", people);
        super.onSaveInstanceState(outState);
    }

    class peopleAdapter extends BaseAdapter
    {
        @Override
        public int getCount() {
            if (mContext.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT)
                return people.getResults().size()/2;
            else
                return people.getResults().size()/3;
        }

        @Override
        public Object getItem(int position) {
            return people.getResults().get(position);
        }

        @Override
        public long getItemId(int position) {
            return position;
        }

        @Override
        public View getView(int position, View convertView, ViewGroup parent) {

            if (mContext.getResources().getConfiguration().orientation == Configuration.ORIENTATION_PORTRAIT) {
                int leftPos = position * 2;
                int rightPos = leftPos + 1;


                if (convertView == null) {
                    LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                    convertView = inflater.inflate(R.layout.row, parent, false);
                }

                ImageView imageLeft = (ImageView) convertView.findViewById(R.id.imagePerson);
                Picasso.with(mContext).load(people.getResults().get(leftPos).getPicture().getLarge()).transform(new RoundedTransformation(5,0)).into(imageLeft);
                TextView textViewLeft = (TextView) convertView.findViewById(R.id.namePerson);
                String fullNameLeft = people.getResults().get(leftPos).getName().getFirst() + " " + people.getResults().get(position).getName().getLast();
                textViewLeft.setText(fullNameLeft);

                ImageView imageRight = (ImageView) convertView.findViewById(R.id.imagePerson2);
                Picasso.with(mContext).load(people.getResults().get(rightPos).getPicture().getLarge()).transform(new RoundedTransformation(5, 0)).into(imageRight);
                TextView textViewRight = (TextView) convertView.findViewById(R.id.namePerson2);
                String fullNameRight = people.getResults().get(rightPos).getName().getFirst() + " " + people.getResults().get(position).getName().getLast();
                textViewRight.setText(fullNameRight);

                return convertView;
            }
            else
            {
                int leftPos = position * 3;
                int centerPos = leftPos + 1;
                int rightPos = leftPos + 2;


                if (convertView == null) {
                    LayoutInflater inflater = (LayoutInflater) mContext.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
                    convertView = inflater.inflate(R.layout.row_land, parent, false);
                }

                ImageView imageLeft = (ImageView) convertView.findViewById(R.id.imagePerson);
                Picasso.with(mContext).load(people.getResults().get(leftPos).getPicture().getLarge()).transform(new RoundedTransformation(5,0)).into(imageLeft);
                TextView textViewLeft = (TextView) convertView.findViewById(R.id.namePerson);
                String fullNameLeft = people.getResults().get(leftPos).getName().getFirst() + " " + people.getResults().get(position).getName().getLast();
                textViewLeft.setText(fullNameLeft);

                ImageView imageCenter = (ImageView) convertView.findViewById(R.id.imagePerson2);
                Picasso.with(mContext).load(people.getResults().get(centerPos).getPicture().getLarge()).transform(new RoundedTransformation(5,0)).into(imageCenter);
                TextView textViewCenter = (TextView) convertView.findViewById(R.id.namePerson2);
                String fullNameCenter = people.getResults().get(centerPos).getName().getFirst() + " " + people.getResults().get(position).getName().getLast();
                textViewCenter.setText(fullNameCenter);

                ImageView imageRight = (ImageView) convertView.findViewById(R.id.imagePerson3);
                Picasso.with(mContext).load(people.getResults().get(rightPos).getPicture().getLarge()).transform(new RoundedTransformation(5,0)).into(imageRight);
                TextView textViewRight = (TextView) convertView.findViewById(R.id.namePerson3);
                String fullNameRight = people.getResults().get(rightPos).getName().getFirst() + " " + people.getResults().get(position).getName().getLast();
                textViewRight.setText(fullNameRight);

                return convertView;
            }
        }
    }


}
