using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace App.TalkAnswer.SaveTalkProgress
{
    public abstract class Value
    {
        static readonly object?[] EmptyParameters = new object?[0];

        public override bool Equals(object? obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != GetType()) return false;
            return Equals((Value)obj);
        }

        public override string ToString() => ValueSignature?.ToString() ?? GetType().ToString();

        protected bool Equals(Value? other)
        {
            if (other == null) return false;
            var signature = ValueSignature;
            return signature != null
                ? other?.ValueSignature.Equals(signature) ?? false
                : Equals(GetValues(this), GetValues(other));
        }
        protected virtual object ValueSignature { get; }

        IDictionary<string, object?> GetValues(object obj) =>
            obj.GetType()
                .GetProperties()
                .Select(x => (x.Name, x.GetMethod.Invoke(obj, EmptyParameters)))
                .ToDictionary(x => x.Name, x => x.Item2);

        bool Equals(IDictionary<string, object?> a, IDictionary<string, object?> b)
        {
            object? aValue;
            object? bValue;
            foreach (var key in a.Keys)
            {
                aValue = a[key];
                if (!b.TryGetValue(key, out bValue)) return false;
                if (aValue == null && bValue == null) continue;
                if (aValue == null || bValue == null) return false;
                if (!aValue.Equals(bValue)) return false;
            }
            return true;
        }

        public override int GetHashCode()
        {
            if (ValueSignature != null) return ValueSignature.GetHashCode();
            var hashCode = new HashCode();
            GetValues(this).Iter(hashCode.Add);
            return hashCode.ToHashCode();
        }
    }

    public class ValueOf<T>
    {
        public T Value { get; }
        public ValueOf(T value) => Value = value;
        public override string ToString() => Value + "";
        protected bool Equals(ValueOf<T> other) => EqualityComparer<T>.Default.Equals(Value, other.Value);

        public override bool Equals(object? obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((ValueOf<T>)obj);
        }

        public override int GetHashCode() =>
            Value != null ? EqualityComparer<T>.Default.GetHashCode(Value) : 0;
    }
}